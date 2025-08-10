import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: 'shopdrop-jjq2e',
  appId: '1:434276381669:web:59d80217e84ac39ecdb50c',
  storageBucket: 'shopdrop-jjq2e.firebasestorage.app',
  apiKey: 'AIzaSyDhGoD_k_LS_5hhxyomfiCJRq2Dxa2q-9o',
  authDomain: 'shopdrop-jjq2e.firebaseapp.com',
  measurementId: '',
  messagingSenderId: '434276381669',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
