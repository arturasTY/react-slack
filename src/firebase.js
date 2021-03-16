import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAQGFvRxEhBInPCkK_F8JSzd0E7SILBpa4",
  authDomain: "slack-2578f.firebaseapp.com",
  projectId: "slack-2578f",
  storageBucket: "slack-2578f.appspot.com",
  messagingSenderId: "984452087794",
  appId: "1:984452087794:web:628b05c5adeffe0714756b",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const authentication = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, authentication, provider };
