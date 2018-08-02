import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig ={
    apiKey: "AIzaSyAVsTWNtKGuF8q600-8e5BIL6tiImOkuEk",
    authDomain: "insiders-3528d.firebaseapp.com",
    databaseURL: "https://insiders-3528d.firebaseio.com",
    projectId: "insiders-3528d",
    storageBucket: "insiders-3528d.appspot.com",
    messagingSenderId: "655980483534"
}

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {
    timestampsInSnapshots: true
}
firestore.settings(settings);

export default firebase;