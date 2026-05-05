// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Configuração Firebase real
const firebaseConfig = {
  apiKey: "AIzaSyBS-FqkY0_SVmHuGdio8tYq_OuHeL6Ubwg",
  authDomain: "assistente-ai-ee550.firebaseapp.com",
  projectId: "assistente-ai-ee550",
  storageBucket: "assistente-ai-ee550.firebasestorage.app",
  messagingSenderId: "164180708748",
  appId: "1:164180708748:web:b1e0e16924b12b88b95aa9",
  measurementId: "G-9BKGYRBPSB"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
