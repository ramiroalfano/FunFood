import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD18P_ysxh44PZPT10xkfR0Ifq2BSMQh-Q",
  authDomain: "funfood-371b5.firebaseapp.com",
  databaseURL: "https://funfood-371b5-default-rtdb.firebaseio.com",
  projectId: "funfood-371b5",
  storageBucket: "funfood-371b5.firebasestorage.app",
  messagingSenderId: "901586123943",
  appId: "1:901586123943:web:b10e1ae4b3b23527ed6f82",
  measurementId: "G-0S7HV74RFB"
};

// Initialize Firebase
let app;
try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    console.log("Firebase inicializado correctamente");
  } else {
    app = getApp();
    console.log("Firebase ya estaba inicializado");
  }
} catch (error) {
  console.error("Error al inicializar Firebase:", error);
}

export const auth = getAuth(app);
export const db = getDatabase(app);

// Verificar la inicialización
console.log("Firebase config:", firebaseConfig); 