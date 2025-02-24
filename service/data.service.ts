/* eslint-disable no-console */
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

class DataService {
  async getCollection(collectionName: string) {
    const querySnapshot = await getDocs(collection(db, collectionName));

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();

      console.log("🔥 Data from Firebase:", data);

      return {
        id: doc.id,
        date: data.date || "",
        training: data.training || "",
      };
    });
  }

  async addDocument(collectionName: string, data: Record<string, any>) {
    try {
      const docRef = await addDoc(collection(db, collectionName), data);

      return docRef.id;
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  }

  async deleteDocument(collectionName: string, id: string) {
    try {
      await deleteDoc(doc(db, collectionName, id));
    } catch (e) {
      console.error("Error removing document: ", e);
      throw e;
    }
  }
}

export default DataService;
