import firebase from 'firebase/app';

//  Needed to prevent undefined errors when re-export firebase.firestore() and firebase.storage()
/* eslint-disable import/no-duplicates */
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/analytics';
/* eslint-disable import/no-duplicates */

firebase.initializeApp({
  apiKey: 'AIzaSyAVH9JVCRrGbXfUv_BfJw_7Lx0IhFWl9fk',
  authDomain: 'dungeon-chest-eca8d.firebaseapp.com',
  databaseURL: 'https://dungeon-chest-eca8d.firebaseio.com',
  projectId: 'dungeon-chest-eca8d',
  storageBucket: 'dungeon-chest-eca8d.appspot.com',
  messagingSenderId: '757829442285',
  appId: '1:757829442285:web:796aa74217d3596f0d4ae4',
  measurementId: 'G-EZMX6ZCK2J',
});

firebase.analytics();

const firestore = firebase.firestore();
const storage = firebase.storage();

export { firestore, storage };
