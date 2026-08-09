import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// À REMPLACER - crée un projet gratuit sur https://console.firebase.google.com
// Puis renseigne les variables VITE_FIREBASE_* dans un fichier .env.local.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'demo-taskflow.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo-taskflow',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'demo-taskflow.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '000000000000',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:000000000000:web:demo'
};

export const isFirebaseConfigured = Boolean(import.meta.env.VITE_FIREBASE_PROJECT_ID);
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);