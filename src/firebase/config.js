import firebase from "firebase/app";
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCoBVIvA6Dy9J345Ajqjd_P95uwsi-onqM",
    authDomain: "cooking-app-251.firebaseapp.com",
    projectId: "cooking-app-251",
    storageBucket: "cooking-app-251.appspot.com",
    messagingSenderId: "919470251368",
    appId: "1:919470251368:web:41bd6aef1858153d08cadd"
  };

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();

export { projectFirestore };