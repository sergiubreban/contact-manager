import { useContext } from 'react';
import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { collection, doc, getFirestore, updateDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { useToast, UseToastOptions } from '@chakra-ui/react';
import { AccountContext } from '../Context/WalletAccount';

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

// firebase new contact collection reference
const useNewContactRef = () => {
  const firestore = useFirestore();
  return collection(firestore, 'Contact');
};

// firebase contact collection reference
const useContactDocRef = (docId: string) => {
  const firestore = useFirestore();
  return doc(firestore, 'Contact', docId);
};

// firebase auth update document helper
const useUpdateDoc = (model: string) => {
  const firestore = useFirestore();
  return (docId: string, data: Partial<unknown>) => updateDoc(doc(firestore, model, docId), data);
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

const useMetamask = () => useContext(AccountContext);

export {
  useFirebaseApp,
  useFirestore,
  useStorage,
  useAppToast,
  useNewContactRef,
  useMetamask,
  useUpdateDoc,
  useContactDocRef,
};
