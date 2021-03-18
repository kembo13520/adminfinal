import firebase from 'firebase/app';
import 'firebase/firestore'
import "firebase/storage";
import "firebase/auth";

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyCP7cjatL6T7NIejEzW8bha35w44s6xY6I",
  authDomain: "ticketland-cb74c.firebaseapp.com",
  databaseURL: "https://ticketland-cb74c-default-rtdb.firebaseio.com",
  projectId: "ticketland-cb74c",
  storageBucket: "ticketland-cb74c.appspot.com",
  messagingSenderId: "564923974023",
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);



const storage = firebase.storage();

const auth = firebase.auth();

export {storage, auth, firebase as default};
