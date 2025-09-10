
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyD7FLYynyapKwilCDHFeD3fSncMnMxnVDA",
  authDomain: "human-as-a-service.firebaseapp.com",
  projectId: "human-as-a-service",
  storageBucket: "human-as-a-service.appspot.com",
  messagingSenderId: "195937028622",
  appId: "1:195937028622:web:049856f28cfee9fa6aca5f",
  measurementId: "G-GK7MQM77ZG",
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
