// Firebase sdk
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";


const app = firebase.initializeApp({
  apiKey: "AIzaSyDdiu68eujLmW7AZ5A7thytC43C-NBL9wI",
  authDomain: "messenger-chat-app-fbfb0.firebaseapp.com",
  projectId: "messenger-chat-app-fbfb0",
  storageBucket: "messenger-chat-app-fbfb0.appspot.com",
  messagingSenderId: "561998383695",
  appId: "1:561998383695:web:3df307ed8be1b477c8383a"
});

export const auth = app.auth();
export default app;