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
}

export default DataService;
