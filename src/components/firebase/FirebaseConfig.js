// src/firebase/FirebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyD18P_ysxh44PZPT10xkfR0Ifq2BSMQh-Q",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "funfood-371b5.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "funfood-371b5",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "funfood-371b5.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "901586123943",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:901586123943:web:b10e1ae4b3b23527ed6f82",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-0S7HV74RFB",
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL || "https://funfood-371b5-default-rtdb.firebaseio.com"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const firestoreDb = getFirestore(app);
export const functions = getFunctions(app);

// También podrías exportar la instancia de la app si la necesitas en algún lugar
// export const app = firebaseApp;

