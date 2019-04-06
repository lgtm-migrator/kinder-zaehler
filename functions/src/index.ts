import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp(functions.config().firebase);

export * from './scout-funcitons';
export * from './child-functions';
export * from './user-initialisation';
