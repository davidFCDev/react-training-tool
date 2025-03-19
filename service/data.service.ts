/* eslint-disable no-console */
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import { GYMNASTICS, STRENGTH } from "@/constants";

class DataService {
  // CRUD operations
  async getCollection(collectionName: string) {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error fetching collection:", error);
      throw error;
    }
  }

  async getDocumentById(collectionName: string, id: string) {
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.warn("No such document:", id);

        return null;
      }

      return { id: docSnap.id, ...docSnap.data() };
    } catch (error) {
      console.error("Error fetching document:", error);
      throw error;
    }
  }

  async addDocumentWithId(
    collectionName: string,
    id: string,
    training: Record<string, any>,
    date: string
  ) {
    try {
      const newTraining = { id, date, training };

      await setDoc(doc(db, collectionName, id), newTraining);
      console.log("Document added:", newTraining);

      return id;
    } catch (error) {
      console.error("Error adding document:", error);
      throw error;
    }
  }

  async deleteDocument(collectionName: string, id: string) {
    try {
      const docRef = doc(db, collectionName, id);

      await deleteDoc(docRef);
      console.log("Document deleted:", id);
    } catch (error) {
      console.error("Error deleting document:", error);
      throw error;
    }
  }

  async updateDocument(
    collectionName: string,
    id: string,
    updatedData: Record<string, any>
  ) {
    try {
      const docRef = doc(db, collectionName, id);

      await updateDoc(docRef, updatedData);
      console.log("Document updated:", id, updatedData);
    } catch (error) {
      console.error("Error updating document:", error);
      throw error;
    }
  }

  // Custom operations

  isInMonth(
    dateString: string,
    month: number | null,
    year: number | null
  ): boolean {
    if (month === null && year === null) return true;

    const date = new Date(dateString);

    if (year !== null && date.getFullYear() !== year) {
      return false;
    }

    return date.getMonth() + 1 === month || month === null;
  }

  // Function to get the total training minutes by day of the week
  async getTrainingCountByType(
    collectionName: string,
    filterFn: (data: any) => boolean = () => true
  ) {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const trainingCounts: Record<string, number> = {};

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const training = data.training;
        const type = training?.type || "Unknown";

        if (filterFn(data)) {
          trainingCounts[type] = (trainingCounts[type] || 0) + 1;
        }
      });

      return trainingCounts;
    } catch (error) {
      console.error("Error fetching training counts by type:", error);
      throw error;
    }
  }

  // Function to get the total training minutes by day of the week and type
  async getTotalTrainingMinutesByDayOfWeekAndType(
    collectionName: string,
    selectedMonth: number | null,
    selectedYear: number | null
  ) {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));

      const dayOfWeekMinutes: Record<string, Record<string, number>> = {
        Monday: {},
        Tuesday: {},
        Wednesday: {},
        Thursday: {},
        Friday: {},
        Saturday: {},
        Sunday: {},
      };

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const training = data.training;

        if (!training || !training.time || !data.date || !training.type) {
          console.warn("Missing fields in document:", doc.id);

          return;
        }

        // Filter by month and year
        if (!this.isInMonth(data.date, selectedMonth, selectedYear)) {
          return;
        }

        const date = new Date(data.date);
        const dayIndex = date.getDay();
        const dayNames = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const dayName = dayNames[dayIndex];
        const trainingType = training.type || "Other";
        const duration = parseInt(training.time, 10) || 0;

        // Initialize the day of the week if it doesn't exist
        if (!dayOfWeekMinutes[dayName][trainingType]) {
          dayOfWeekMinutes[dayName][trainingType] = 0;
        }

        // Sum the duration
        dayOfWeekMinutes[dayName][trainingType] += duration;
      });

      return dayOfWeekMinutes;
    } catch (error) {
      console.error(
        "Error fetching total training minutes by day of the week and type:",
        error
      );
      throw error;
    }
  }

  // Function to get the total training minutes by type
  async getGroupedExerciseCountsByMonth(
    collectionName: string,
    selectedMonth: number | null,
    selectedYear: number | null
  ) {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));

      const strengthGroups = {
        snatch: 0,
        clean: 0,
        squat: 0,
        pushPress: 0,
        cleanAndJerk: 0,
        deadlift: 0,
      };

      const gymnasticsGroups = {
        handStand: 0,
        pullUp: 0,
        barMuscleUp: 0,
        ringMuscleUp: 0,
        core: 0,
      };

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const date = new Date(data.date);

        if (
          (selectedMonth !== null && date.getMonth() + 1 !== selectedMonth) ||
          (selectedYear !== null && date.getFullYear() !== selectedYear)
        ) {
          return;
        }

        const trainingFields = [
          data.training.accessory,
          data.training.metcon,
          data.training.strength,
          data.training.warmup,
        ];

        const countOccurrences = (text: string, terms: string[]): number => {
          let count = 0;

          terms.forEach((term) => {
            const regex = new RegExp(term, "gi");

            count += (text.match(regex) || []).length;
          });

          return count;
        };

        trainingFields.forEach((field) => {
          if (field) {
            // Strength
            strengthGroups.snatch += countOccurrences(field, STRENGTH.SNATCH);
            strengthGroups.clean += countOccurrences(field, STRENGTH.CLEAN);
            strengthGroups.squat += countOccurrences(field, STRENGTH.SQUAT);
            strengthGroups.pushPress += countOccurrences(field, STRENGTH.PRESS);
            strengthGroups.cleanAndJerk += countOccurrences(
              field,
              STRENGTH.CAJ
            );
            strengthGroups.deadlift += countOccurrences(
              field,
              STRENGTH.DEADLIFT
            );

            // Gimnastics
            gymnasticsGroups.handStand += countOccurrences(
              field,
              GYMNASTICS.HANDSTAND
            );
            gymnasticsGroups.pullUp += countOccurrences(field, GYMNASTICS.PULL);
            gymnasticsGroups.barMuscleUp += countOccurrences(
              field,
              GYMNASTICS.MU
            );
            gymnasticsGroups.ringMuscleUp += countOccurrences(
              field,
              GYMNASTICS.RMU
            );
            gymnasticsGroups.core += countOccurrences(field, GYMNASTICS.CORE);
          }
        });
      });

      // Format data for charts
      const strengthData = [
        { id: "clean", value: strengthGroups.clean, label: "Clean" },
        { id: "snatch", value: strengthGroups.snatch, label: "Snatch" },
        { id: "squat", value: strengthGroups.squat, label: "Back/Front Squat" },
        {
          id: "pushPress",
          value: strengthGroups.pushPress,
          label: "Push Press/Jerk",
        },
        {
          id: "cleanAndJerk",
          value: strengthGroups.cleanAndJerk,
          label: "Clean & Jerk",
        },
        { id: "deadlift", value: strengthGroups.deadlift, label: "Deadlift" },
      ];

      const gymnasticsData = [
        {
          id: "handStand",
          value: gymnasticsGroups.handStand,
          label: "Hand Stand",
        },
        { id: "pullUp", value: gymnasticsGroups.pullUp, label: "Pull Up/C2B" },
        { id: "toesToBar", value: gymnasticsGroups.core, label: "Core" },
        {
          id: "barMuscleUp",
          value: gymnasticsGroups.barMuscleUp,
          label: "Bar Muscle Up",
        },
        {
          id: "ringMuscleUp",
          value: gymnasticsGroups.ringMuscleUp,
          label: "Ring Muscle Up",
        },
      ];

      return { strengthData, gymnasticsData };
    } catch (error) {
      console.error("Error fetching grouped exercise counts:", error);
      throw error;
    }
  }

  // Function to get all the occupied dates
  async getOccupiedDates(collectionName: string): Promise<string[]> {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const occupiedDates: Set<string> = new Set();

      querySnapshot.forEach((doc) => {
        const data = doc.data();

        if (data.date) {
          occupiedDates.add(data.date);
        }
      });

      return Array.from(occupiedDates);
    } catch (error) {
      console.error("Error fetching occupied dates:", error);
      throw error;
    }
  }
}

export default DataService;
