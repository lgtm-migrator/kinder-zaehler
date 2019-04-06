import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import {hasUserAccsessToScout} from "./util";

const firestore = admin.firestore();

export const createChild = functions.https.onCall(async (data: { name?: any, scoutId?: any }, context) => {
  if (context.auth === undefined) {
    return;
  }

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 3) {
    return;
  }

  if (!data.scoutId || typeof data.scoutId !== 'string') {
    return;
  }

  const {name, scoutId} = data;


  if (!await hasUserAccsessToScout(context.auth.uid, scoutId)) {
    return;
  }

  await firestore.collection('scouts').doc(scoutId).collection('children').add({
    name
  });
});
