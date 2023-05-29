import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyA90UMCTWSzM6QMovuEVEeqotIGsiXItt8",
    authDomain: "ecommerce-with-hoocks.firebaseapp.com",
    projectId: "ecommerce-with-hoocks",
    storageBucket: "ecommerce-with-hoocks.appspot.com",
    messagingSenderId: "430749009655",
    appId: "1:430749009655:web:6d13b8deba65919385f5f2",
    measurementId: "G-435TTZQJ7G"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const fs = firebase.firestore();
const storage = firebase.storage();

export { auth, fs, storage };