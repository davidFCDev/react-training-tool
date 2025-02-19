/* eslint-disable no-console */
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";

class AuthService {
  async register(
    email: string,
    password: string
  ): Promise<UserCredential | string> {
    const auth = getAuth();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      return userCredential;
    } catch (error: any) {
      console.error("Error en register:", error.message);

      return error.message;
    }
  }

  async login(
    email: string,
    password: string
  ): Promise<UserCredential | string> {
    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      return userCredential;
    } catch (error: any) {
      console.error("Error en login:", error.message);

      return error.message;
    }
  }

  async logout(): Promise<boolean> {
    const auth = getAuth();

    try {
      await signOut(auth);

      return true;
    } catch (error: any) {
      console.error("Error en logout:", error.message);

      return false;
    }
  }
}

export default new AuthService();
