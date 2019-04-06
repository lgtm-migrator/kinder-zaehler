import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import {getUserData} from "./util";

const firestore = admin.firestore();

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

  const {userRef, userData} = await getUserData(context.auth.uid);

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

  const {userRef, userData} = await getUserData(context.auth.uid);

  if (userData === undefined) {
    return;
  }

  if (userData.scouts.includes(scoutId)) {
    return; // user already has scoutId
  }

  userData.scouts.push(scoutId);
  await userRef.set(userData);
  return;
});

export const leaveScout = functions.https.onCall(async (data, context) => {
  if (context.auth === undefined) {
    return;
  }

  if (data.scoutId === undefined || typeof data.scoutId !== 'string') {
    return;
  }

  const scoutId = data.scoutId;
  const {userRef, userData} = await getUserData(context.auth.uid);

  if (userData === undefined) {
    return;
  }

  userData.scouts = userData.scouts.filter((s: string) => s !== scoutId);
  await userRef.set(userData);
  return;
});
