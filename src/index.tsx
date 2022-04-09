import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import { GameDataProvider} from './context/gameDataContext'
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const queryClient = new QueryClient()

// window.addEventListener("scroll", (e) => {
//   e.preventDefault();
//   window.scrollTo(0, 0);
// });

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GameDataProvider>
        <App />
      </GameDataProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);