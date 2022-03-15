import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import { GameDataProvider} from './context/gameDataContext'
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";

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