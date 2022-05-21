import { ref, onValue } from 'firebase/database';
import { db } from '../utils/firebase-config';

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
