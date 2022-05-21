import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../utils/firebase-config';

// Custom Hook, used in <Users />
export function useAllUsers() {
  const [users, setUsers] = useState();

  useEffect(() => {
    const unsubsribe = onValue(ref(db, 'users/'), (snapshot) => {
      const items = [];

      snapshot.forEach((child) => {
        items.push({
          uid: child.key,
          ...child.val(),
        });
      });
      setUsers(items);
    });

    return unsubsribe;
  }, []);

  return users;
}

// Function to return all users to the callback function.
export function getAllUsers(callback) {
  onValue(ref(db, 'users/'), (snapshot) => {
    const items = [];

    snapshot.forEach((child) => {
      items.push({
        uid: child.key,
        ...child.val(),
      });
    });
    callback(items);
  });
}

export function getUserDataByUid(uid, callback) {
  onValue(ref(db, `/users/${uid}`), (snapshot) => {
    callback(snapshot.val());
  });
}
