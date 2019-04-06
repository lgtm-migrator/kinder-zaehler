import * as admin from 'firebase-admin';
import {User} from "./model/user.model";

const firestore = admin.firestore();

export async function getUserData(userId: string): Promise<{ userRef: FirebaseFirestore.DocumentReference, userData: User | undefined }> {
  const userRef = await firestore.collection('users').doc(userId);
  const userSnapshot = await userRef.get();

  const userData = <User | undefined>userSnapshot.data();

  if (userData === undefined) {
    console.error(`uid: '${userId}' has no firestore object`);
  }


  return {userRef: userRef, userData: userData}
}

export async function hasUserAccsessToScout(userId: string, scoutId: string): Promise<boolean> {
  const {userData} = await getUserData(userId);

  if (userData === undefined) {
    return false;
  }

  return userData.scouts.includes(scoutId);
}