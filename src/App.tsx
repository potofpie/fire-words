import {FC }from 'react';
import { GameBoard } from './components'
import { useGameData} from './context/gameDataContext'
import { AppHeader, Credit } from './styled'

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
      <AppHeader>Fire Words</AppHeader>

      <Router>
        <Routes>
          <Route path='/' element={ gameBoardState ? <GameBoard /> : <></>}
          
          />
          <Route path='/credits' element={ 
                <>
                Credits:
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

