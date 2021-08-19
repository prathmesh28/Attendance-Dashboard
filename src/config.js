import firebase from "firebase";
const config = {
    apiKey: "AIzaSyDXt5TouqPHoGUlxYsFjE0xAGL0s9gwIhk",
    authDomain: "attendance-1e171.firebaseapp.com",
    databaseURL: "https://attendance-1e171-default-rtdb.firebaseio.com",
    projectId: "attendance-1e171",
    storageBucket: "attendance-1e171.appspot.com",
    messagingSenderId: "545222347576",
    appId: "1:545222347576:web:9a194482b70568e9024fcd"
  };
  
const Firebase = firebase.initializeApp(config)
export default Firebase
