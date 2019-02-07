import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();

const firestore = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

export const createScout = functions.https.onCall(async (data, context) => {
  if (context.auth === undefined) {
    return;
  }

  if (data.name === undefined || typeof data.name !== 'string' || data.name.trim().length < 3) {
    return;
  }

  const scoutRef = await firestore.collection('scouts').add({
    name: data.name
  });
  const scoutId = scoutRef.id;

  const userRef = await firestore.collection('users').doc(context.auth.uid);
  const userSnapshot = await userRef.get();

  if (userSnapshot === undefined || !userSnapshot.exists) {
    console.error(`uid: '${context.auth.uid}' has no firestore object`);
    return;
  }

  const userData = userSnapshot.data();

  if (userData === undefined) {
    return;
  }

  userData.scouts.push(scoutId);

  await userRef.set(userData);

  return;
});

export const joinScout = functions.https.onCall(async (data, context) => {
  if (context.auth === undefined) {
    return;
  }

  if (data.scoutId === undefined || typeof data.scoutId !== 'string') {
    return;
  }

  const scoutId = data.scoutId;

  const scoutRef = await firestore.collection('scouts').doc(scoutId).get();
  if (!scoutRef.exists) {
    return;
  }

  const userRef = await firestore.collection('users').doc(context.auth.uid);
  const userSnapshot = await userRef.get();

  if (userSnapshot === undefined || !userSnapshot.exists) {
    console.error(`uid: '${context.auth.uid}' has no firestore object`);
    return;
  }

  const userData = userSnapshot.data();

  if (userData === undefined) {
    return;
  }

  userData.scouts.push(scoutId);
  await userRef.set(userData);
  return;
});

export const ping = functions.https.onRequest((request, response) => {
  response.send("pong")
});
