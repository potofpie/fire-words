import {FC }from 'react';

import { GameBoard, StartScreen, TutorialGameBoard } from './components'
import { useGameData} from './context/gameDataContext'
import {  Credit } from './styled'
import { TourProvider } from '@reactour/tour'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate
} from "react-router-dom";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";


const createSteps = () => {

  const steps = [
    {
      selector: '#root',
      content: 'Welcome to fire words!',
      padding: 0,
      disableActions: false
    },
    {
      selector: '[data-tut="11"]',
      content: 'Select R!',
      padding: 0
    },
    {
      selector: '[data-tut="21"]',
      content: 'Select U!'
    },
    {
      selector: '[data-tut="31"]',
      content: 'Select N!'
    },
    {
      selector: '[data-tut="selected_word"]',
      content: 'Submit the word you have selected!'
    },
    {
      selector: '[data-tut="44"]',
      content: 'Now select S!'
    },
    {
      selector: '[data-tut="45"]',
      content: 'and now O!'
    },
    {
      selector: '[data-tut="selected_word"]',
      content: 'Now try yo submit SO'
    },
    {
      selector: '#root',
      content: 'As you can see this word was rejected because 2 letter words dont count!'
    },
    {
      selector: '[data-tut="21"]',
      content: 'Last peice of info, The blue tiles are cooler'
    },
    {
      selector: '[data-tut="14"]',
      content: 'And the red tiles are hotter. Use the red tiles first because if they are to hot it will be GAME OVER!'
    },
    {
      selector: '[data-tut="14"]',
      content: 'You are ready to start! Press the X up there ^'
    },
  ]
  return steps

}

export const TutorialRoute:FC = () => {
  const disableBody = (target: any) => disableBodyScroll(target);
  const enableBody = (target: any) => enableBodyScroll(target);
  let navigate = useNavigate();


  return (
    <TourProvider 
    steps={createSteps()} 
    afterOpen={disableBody} 
    beforeClose={enableBody}
    onClickClose={() => navigate('game')}
    showBadge={false}
    showCloseButton={true}
  >
  <TutorialGameBoard /> 
</TourProvider>
  )

}

  export const App:FC = () => {
    const  { gameBoardState } = useGameData()!

    return (
      <>
        <Router>
          <Routes>
            
            <Route path='/' element={<StartScreen/>}/>
            <Route path='/tutorial' element={ gameBoardState ? <TutorialRoute/> : <></>}/>
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

