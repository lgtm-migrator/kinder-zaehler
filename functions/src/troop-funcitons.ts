import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import {getUserData} from "./util";

const firestore = admin.firestore();

export const createTroop = functions.https.onCall(async (data, context) => {
  if (context.auth === undefined) {
    return;
  }

  if (data.name === undefined || typeof data.name !== 'string' || data.name.trim().length < 3) {
    return;
  }

  const troopRef = await firestore.collection('troops').add({
    name: data.name
  });
  const troopId = troopRef.id;

  const {userRef, userData} = await getUserData(context.auth.uid);

  if (userData === undefined) {
    return;
  }

  userData.troops.push(troopId);

  await userRef.set(userData);

  return;
});

export const joinTroop = functions.https.onCall(async (data, context) => {
  if (context.auth === undefined) {
    return;
  }

  if (data.troopId === undefined || typeof data.troopId !== 'string') {
    return;
  }

  const troopId = data.troopId;

  const troopRef = await firestore.collection('troops').doc(troopId).get();
  if (!troopRef.exists) {
    return;
  }

  const {userRef, userData} = await getUserData(context.auth.uid);

  if (userData === undefined) {
    return;
  }

  if (userData.troops.includes(troopId)) {
    return; // user already has troopId
  }

  userData.troops.push(troopId);
  await userRef.set(userData);
  return;
});

export const leaveTroop = functions.https.onCall(async (data, context) => {
  if (context.auth === undefined) {
    return;
  }

  if (data.troopId === undefined || typeof data.troopId !== 'string') {
    return;
  }

  const troopId = data.troopId;
  const {userRef, userData} = await getUserData(context.auth.uid);

  if (userData === undefined) {
    return;
  }

  userData.troops = userData.troops.filter((s: string) => s !== troopId);
  await userRef.set(userData);
  return;
});
