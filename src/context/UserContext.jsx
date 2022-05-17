import React, { useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
} from 'firebase/auth';
import {
  ref, onValue, set, push, update,
} from 'firebase/database';
import { auth, db } from '../utils/firebase-config';

const UserContext = React.createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [currentUserData, setCurrentUserData] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateUsersEmail(email) {
    return updateEmail(auth.currentUser, email);
  }

  function updateUsersPassword(password) {
    return updatePassword(auth.currentUser, password);
  }

  function createUserInDb(age = Number, firstName = '', lastName = '') {
    const newUserRef = ref(db, `users/${auth.currentUser.uid}`);
    set(newUserRef, {
      age,
      firstName,
      lastName,
      stool: {},
    });
  }

  function writeStoolData(timestamp, comment, bristolStoolScale) {
    const newStoolRef = ref(db, `users/${auth.currentUser.uid}/stool/`);
    set(push(newStoolRef), {
      timestamp,
      bristolStoolScale,
      comment,
    });
  }

  function updateFirstName(newFirstName) {
    const newUserRef = ref(db, `users/${auth.currentUser.uid}`);
    update(newUserRef, {
      firstName: newFirstName,
    });
  }

  function updateLastName(newLastName) {
    const userRef = ref(db, `users/${auth.currentUser.uid}`);
    update(userRef, {
      lastName: newLastName,
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      if (user) {
        onValue(ref(db, `/users/${user.uid}`), (snapshot) => {
          const response = snapshot.val();
          setCurrentUserData(response);
        });
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    currentUserData,
    login,
    signup,
    logout,
    resetPassword,
    updateUsersEmail,
    updateUsersPassword,
    createUserInDb,
    writeStoolData,
    updateFirstName,
    updateLastName,
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
}
