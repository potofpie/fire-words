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

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
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