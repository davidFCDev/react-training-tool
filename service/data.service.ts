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

      return querySnapshot.docs.map((doc) => {
        const data = doc.data();

        if (!data.training || !data.date) {
          console.warn("⚠️ Incomplete data found:", data);
        }

        return {
          id: doc.id,
          date: data.date || new Date().toISOString(),
          training: data.training || {},
        };
      });
    } catch (e) {
      console.error("Error fetching collection: ", e);
      throw e;
    }
  }

  async getDocumentById(collectionName: string, id: string) {
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        console.log("📄 Document data:", data);

        return {
          id: docSnap.id,
          date: data.date || new Date().toISOString(),
          training: data.training || {},
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
    training: Record<string, any>,
    date: string
  ) {
    try {
      await setDoc(doc(db, collectionName, id), { training, date });
      console.log("📄 Document added:", { id, training, date });

      return id;
    } catch (e) {
      console.error("Error adding document with ID: ", e);
      throw e;
    }
  }

  async deleteDocument(collectionName: string, id: string) {
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.warn("❌ No such document to delete:", id);

        return;
      }

      await deleteDoc(docRef);
      console.log("🗑️ Document deleted:", id);
    } catch (e) {
      console.error("Error removing document: ", e);
      throw e;
    }
  }

  async updateDocument(
    collectionName: string,
    id: string,
    updatedData: { training: Record<string, any>; date: string }
  ) {
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.warn("❌ Cannot update non-existent document:", id);

        return;
      }

      await updateDoc(docRef, {
        training: updatedData.training,
        date: updatedData.date || new Date().toISOString(),
      });

      console.log("✅ Document updated successfully!");
    } catch (e) {
      console.error("Error updating document: ", e);
      throw e;
    }
  }
}

export default DataService;
