import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { useToast, UseToastOptions } from '@chakra-ui/react';

// firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'keyko-contact.firebaseapp.com',
  projectId: 'keyko-contact',
  storageBucket: 'keyko-contact.appspot.com',
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// firebase root app instance
const useFirebaseApp = () => app;

// firebase db instance
const useFirestore = () => getFirestore(app);

// firebase contact collection
const useContactRef = () => {
  const firestore = useFirestore();
  return collection(firestore, 'Contact');
};

// firebase storage instance
const useStorage = () => getStorage(app);

/**
 * Extends chakra UI Toast component to add custom logic to generic notifications.
 * @returns toast function to call when a notification is needed.
 */
const useAppToast = () => {
  const toast = useToast();

  return (options?: UseToastOptions | undefined) => toast({ ...options, isClosable: options?.isClosable ?? true });
};

export { useFirebaseApp, useFirestore, useStorage, useAppToast, useContactRef };
