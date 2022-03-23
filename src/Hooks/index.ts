import { initializeApp } from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { useToast, UseToastOptions } from "@chakra-ui/react";


// firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAyE3uSGux5NbJGX939F9dv_4r_KU6OWE",
  authDomain: "keyko-contact.firebaseapp.com",
  projectId: "keyko-contact",
  storageBucket: "keyko-contact.appspot.com",
  messagingSenderId: "1087198403044",
  appId: "1:1087198403044:web:c126bfa5cf409eef7acff1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// firebase root app instance
const useFirebaseApp = () => app;

// firebase db instance
const useFirestore = () => getFirestore(app)

// firebase storage instance
const useStorage = () => getStorage(app)

/**
 * Extends chakra UI Toast component to add custom logic to generic notifications.
 * @returns toast function to call when a notification is needed.
 */
const useAppToast = () => {
  const toast = useToast();

  return (options?: UseToastOptions | undefined) => toast({ ...options, isClosable: options?.isClosable ?? true });
}


export {
  useFirebaseApp,
  useFirestore,
  useStorage,
  useAppToast
}