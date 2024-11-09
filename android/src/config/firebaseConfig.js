import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCkntA9KmEbDvj8FVkoNEyiOCDQq8SFzAc",
  authDomain: "miniblog-78e3a.firebaseapp.com",
  projectId: "miniblog-78e3a",
  storageBucket: "miniblog-78e3a.firebasestorage.app",
  messagingSenderId: "208514382552",
  appId: "1:208514382552:web:3329995a3bb022c964b5ad",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
