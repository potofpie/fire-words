import {FC }from 'react';
import styled from 'styled-components';
import { GameBoard } from './GameBoard'
import { useGameData} from './context/gameDataContext'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";





const Header = styled.div`
  width: 100%;
  font-size: 18px; 
  padding: 10px; 
  color: black;
  background-color: #f2f0e6;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
`;

const Credit = styled.a`
  font-size: 10px; 
`;


export const App:FC = () => {
  const  { selected, score } = useGameData()!
  return (
    <>
      <Header>Fire Words</Header>

      <Router>
        <Routes>
          <Route path='/' element={ <GameBoard />}
          
          />
          <Route path='/credits' element={ 
                <>
                Resources:
                  <Credit href="https://www.flaticon.com/free-icons/letters-abc" title="letters abc icons">Letters abc icons created by mynamepong - Flaticon</Credit>
                  <Credit href="https://www.macworld.com/article/196032/firewords.html" title="letters abc icons">This game was base on the orginal Fire Words</Credit>
                </>
          } />
              <Route
                path="*"
                element={<Navigate to="/" />}
            />

        </Routes>
      </Router>

    </>
  );
}

