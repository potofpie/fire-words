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