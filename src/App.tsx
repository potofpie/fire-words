import {FC }from 'react';

import { GameBoard, StartScreen, TutorialGameBoard } from './components'
import { useGameData} from './context/gameDataContext'
import {  Credit } from './styled'
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { TourProvider } from "@reactour/tour";
import steps from './components/TutorialGameBoard/steps';


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";



export const App:FC = () => {
  const  { gameBoardState } = useGameData()!
  const disableBody = (target: any) => disableBodyScroll(target);
  const enableBody = (target: any) => enableBodyScroll(target);
  return (
    <>
      <Router>
        <Routes>
          
          <Route path='/' element={<StartScreen/>}/>
          <Route path='/tutorial' element={ gameBoardState ? 
            <TourProvider steps={steps} defaultOpen afterOpen={disableBody} beforeClose={enableBody}>
             <TutorialGameBoard /> 
            </TourProvider>
             : <></>}/>        
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

