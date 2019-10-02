import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import {hasUserAccessToTroop} from './util';

const firestore = admin.firestore();

export const createScout = functions.https.onCall(async (data: { name?: any, troopId?: any }, context) => {
  if (context.auth === undefined) {
    console.warn('user is not authenticated. data: ', data);
    return;
  }

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 1) {
    console.warn('The name of the Scout is not there or To short. data: ', data);
    return;
  }

  if (!data.troopId || typeof data.troopId !== 'string') {
    console.warn('The troopId is empty. data: ', data);
    return;
  }

  const {name, troopId} = data;


  if (!await hasUserAccessToTroop(context.auth.uid, troopId)) {
    console.warn(`user is not allowed to access to troop. authId: ${context.auth.uid}, data: `, data);
    return;
  }

  await firestore.collection('troops').doc(troopId).collection('scouts').add({
    name
  });
});
