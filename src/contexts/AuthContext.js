import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth).then((user) => setCurrentUser(user));
  }

  function passReset(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function editEmail(email) {
    return updateEmail(auth.currentUser, email).then(
      sendEmailVerification(auth.currentUser)
    );
  }

  function editPassword(password) {
    return updatePassword(auth.currentUser, password);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        console.log("state changed", user);
      } else {
        setCurrentUser();
        console.log(user);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    passReset,
    editEmail,
    editPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
