import firebase from 'firebase';
import { keys } from './keys';

const config = {
  apiKey: keys.FIREBASE_API_KEY,
  authDomain: keys.FIREBASE_AUTH_DOMAIN,
  databaseURL: keys.FIREBASE_DATABASE_URL,
  projectId: keys.FIREBASE_PROJECT_ID,
  storageBucket: keys.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: keys.FIREBASE_MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);

export const database = firebase.database();
