import firebase from 'firebase/app'
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyAzGNcw5Rw8ohJ7jOv3Hy4Ov0csP9PSL94",
  authDomain: "expenses-2e799.firebaseapp.com",
  databaseURL: "https://expenses-2e799.firebaseio.com",
  projectId: "expenses-2e799",
  storageBucket: "expenses-2e799.appspot.com",
  messagingSenderId: "90475826583",
  appId: "1:90475826583:web:821d69d389b44c29d0c8d2",
  measurementId: "G-DM8SZSE4JV"
};
// Initialize Firebase
firebase.initializeApp(config);
firebase.analytics();

export default firebase