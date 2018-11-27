const config = {
  apiKey: "AIzaSyChZ5JQUr-_Mehsm9B4WsEXEejK9Wn41pE",
  authDomain: "isaax-demo.firebaseapp.com",
  databaseURL: "https://isaax-demo.firebaseio.com",
  storageBucket: "bucket.appspot.com"
};

firebase.initializeApp(config);
const collectionId = 'cpu/temp';

const db = firebase.database();
const ref = db.ref(collectionId);
ref.on('child_added', val => {
  console.log(val.val());
});

