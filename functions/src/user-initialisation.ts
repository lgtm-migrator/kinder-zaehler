import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

const firestore = admin.firestore();

export const createInitialUserData = functions.auth.user().onCreate(async (event) => {
  const userRef = firestore.collection('users').doc(event.uid);

  await userRef.set({
    troops: []
  });
});
