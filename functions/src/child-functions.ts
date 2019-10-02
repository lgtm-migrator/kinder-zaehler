import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import {hasUserAccessToTroop} from "./util";

const firestore = admin.firestore();

export const createChild = functions.https.onCall(async (data: { name?: any, troopId?: any }, context) => {
  if (context.auth === undefined) {
    return;
  }

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 1) {
    return;
  }

  if (!data.troopId || typeof data.troopId !== 'string') {
    return;
  }

  const {name, troopId} = data;


  if (!await hasUserAccessToTroop(context.auth.uid, troopId)) {
    return;
  }

  await firestore.collection('troops').doc(troopId).collection('children').add({
    name
  });
});
