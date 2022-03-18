import {FC }from 'react';

import { GameBoard, StartScreen } from './components'
import { useGameData} from './context/gameDataContext'
import {  Credit } from './styled'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";



export const App:FC = () => {
  const  { gameBoardState } = useGameData()!
  return (
    <>
      <Router>
        <Routes>
          
          <Route path='/' element={<StartScreen/>}/>
          
          <Route path='/game' element={ gameBoardState ? <GameBoard /> : <></>}/>
          <Route path='/credits' element={ 
                <div style={{display: 'flex' , flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                Credits:
                  <Credit href="https://www.flaticon.com/free-icons/letters-abc" title="letters abc icons">Letters abc icons created by mynamepong - Flaticon</Credit>
                  <Credit href="https://www.macworld.com/article/196032/firewords.html" title="letters abc icons">This game was base on the orginal Fire Words</Credit>
                </div>
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

