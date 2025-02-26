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
    const querySnapshot = await getDocs(collection(db, collectionName));

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();

      console.log("🔥 Data from Firebase:", data);

      return {
        id: doc.id,
        training: data.training || {},
      };
    });
  }

  async getDocumentById(collectionName: string, id: string) {
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("📄 Document data:", docSnap.data());

        return {
          id: docSnap.id,
          training: docSnap.data().training || {},
        };
      } else {
        console.warn("❌ No such document!");

        return null;
      }
    } catch (e) {
      console.error("Error fetching document by ID: ", e);
      throw e;
    }
  }

  async addDocumentWithId(
    collectionName: string,
    id: string,
    training: Record<string, any>
  ) {
    try {
      await setDoc(doc(db, collectionName, id), { training });

      return id;
    } catch (e) {
      console.error("Error adding document with ID: ", e);
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

  async updateDocument(
    collectionName: string,
    id: string,
    updatedTraining: Record<string, any>
  ) {
    try {
      await updateDoc(doc(db, collectionName, id), {
        training: updatedTraining,
      });
      console.log("✅ Document updated successfully!");
    } catch (e) {
      console.error("Error updating document: ", e);
      throw e;
    }
  }
}

export default DataService;
