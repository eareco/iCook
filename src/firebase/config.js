import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBFu0IeX34ndeNIFfuMrH1mn-qCHVX8DPU",
  authDomain: "integradorarecolaurenz.firebaseapp.com",
  projectId: "integradorarecolaurenz",
  storageBucket: "integradorarecolaurenz.firebasestorage.app",
  messagingSenderId: "551390235443",
  appId: "1:551390235443:web:a899423129270906568c46"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();

