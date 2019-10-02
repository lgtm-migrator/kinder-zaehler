import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp(functions.config().firebase);

export * from './troop-funcitons';
export * from './scout-functions';
export * from './user-initialisation';
