// ------------------------------------------------------------------
// FIREBASE CONFIGURATION
// ------------------------------------------------------------------
// 1. Go to console.firebase.google.com
// 2. Create a project and a web app
// 3. COPY the 'firebaseConfig' object from the Firebase console
// 4. PASTE it entirely below, replacing the placeholder variable.

const firebaseConfig = {
    apiKey: "AIzaSyBSV9tdip444-JE99sIwFj7u-0TbIbLQDs",
    authDomain: "orifume.firebaseapp.com",
    projectId: "orifume",
    storageBucket: "orifume.firebasestorage.app",
    messagingSenderId: "26693902437",
    appId: "1:26693902437:web:e464fdb47a3a0e31be268c",
    measurementId: "G-PVPCS269WS"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

console.log("Firebase Initialized");
