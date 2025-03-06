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

  isInMonth(dateString: string, month: number | null): boolean {
    if (month === null) return true;
    const date = new Date(dateString);

    return date.getMonth() + 1 === month;
  }

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

      console.log("Training counts by type:", trainingCounts);

      return trainingCounts;
    } catch (error) {
      console.error("Error fetching training counts by type:", error);
      throw error;
    }
  }

  async getTotalTrainingMinutesByDayOfWeekAndType(
    collectionName: string,
    selectedMonth: number | null
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

        // Filter by month
        if (!this.isInMonth(data.date, selectedMonth)) {
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

        // Sum the duration for the day of the week and type
        dayOfWeekMinutes[dayName][trainingType] += duration;
      });

      console.log(
        "Total training minutes by day of the week and type:",
        dayOfWeekMinutes
      );

      return dayOfWeekMinutes;
    } catch (error) {
      console.error(
        "Error fetching total training minutes by day of the week and type:",
        error
      );
      throw error;
    }
  }
}

export default DataService;
