import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_apiKey,
  authDomain: import.meta.env.VITE_REACT_authDomain,
  projectId: import.meta.env.VITE_REACT_projectId,
  storageBucket: import.meta.env.VITE_REACT_storageBucket,
  messagingSenderId: import.meta.env.VITE_REACT_messagingSenderId,
  appId: import.meta.env.VITE_REACT_appId,
  measurementId: import.meta.env.VITE_REACT_measurementId,
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

export default firebaseAuth;