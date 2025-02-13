import {initializeApp} from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyC3zKLHC3L-N4GBz2ux91aZbkcoMVBvGWQ',
  authDomain: 'worktok-365da.firebaseapp.com',
  databaseURL: 'https://worktok-365da-default-rtdb.firebaseio.com',
  projectId: 'worktok-365da',
  storageBucket: 'worktok-365da.appspot.com',
  messagingSenderId: '869884011918',
  appId: '1:869884011918:web:6563f85a876c1ed51c70df',
  measurementId: 'G-Q74Z207FL8',
};

export const firebaseApp = initializeApp(firebaseConfig);
