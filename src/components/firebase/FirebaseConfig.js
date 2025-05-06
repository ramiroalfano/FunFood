// src/firebase/FirebaseConfig.js

import firebase from 'firebase/compat/app';
import 'firebase/compat/database'; // Para Realtime Database
import 'firebase/compat/firestore'; // Para Cloud Firestore

// Tu configuración de Firebase (¡USA TUS VALORES REALES AQUÍ!)
const firebaseConfig = {
  apiKey: "TU_API_KEY_REAL", // Reemplaza con tu API Key
  authDomain: "funfood-371b5.firebaseapp.com",
  databaseURL: "https://funfood-371b5-default-rtdb.firebaseio.com", // URL de RTDB
  projectId: "funfood-371b5",
  storageBucket: "funfood-371b5.appspot.com",
  messagingSenderId: "901586123943",
  appId: "1:901586123943:web:...", // Tu App ID web
  measurementId: "G-..." // Si usas Analytics
};

// Inicializa Firebase SOLO si aún no se ha inicializado
let firebaseApp;
if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp(firebaseConfig);
  console.log("Firebase inicializado correctamente en FirebaseConfig.js"); // Opcional
} else {
  firebaseApp = firebase.app(); // Si ya está inicializado, obtenemos la instancia existente
  console.log("Firebase ya estaba inicializado."); // Opcional
}


// Obtén y exporta las instancias de los servicios
export const rtdb = firebaseApp.database(); // Instancia de Realtime Database
export const firestoreDb = firebaseApp.firestore(); // Instancia de Cloud Firestore

// También podrías exportar la instancia de la app si la necesitas en algún lugar
// export const app = firebaseApp;

