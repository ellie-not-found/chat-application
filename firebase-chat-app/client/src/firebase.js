import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC01Pb4utJs6RpR8vDzaFUgWp3ndUESDQ8",
  authDomain: "chat-app-a09ed.firebaseapp.com",
  projectId: "chat-app-a09ed",
  storageBucket: "chat-app-a09ed.firebasestorage.app",
  messagingSenderId: "904641823108",
  appId: "1:904641823108:web:42a72bcde38e8185e2ddd1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app; 