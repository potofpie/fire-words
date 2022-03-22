import {FC }from 'react';
import {LetterTile} from '../LetterTile';
import Fade from 'react-reveal/Fade';
import { useSpring } from "react-spring";
import {
  AiFillCloseCircle,
  AiFillCheckCircle 
} from 'react-icons/ai'
import { useGameData } from '../../context/gameDataContext'
import { Column, Position } from '../../types'
import { Modal } from '../Modal'
import {
  Header, 
  Footer, 
  IconCheckButton, 
  IconCrossButton, 
  WordText, 
  StyledGameBoard, 
  AppHeader,
} from '../../styled'
import { useTour } from "@reactour/tour";
import { useEffect } from 'react';





export const TutorialGameBoard:FC = () => {
  const { isOpen, currentStep, steps, setIsOpen, setCurrentStep } = useTour();
  const  { selected, selectedWord, score, clearTile, gameBoardState, /*status,*/ checkWordLength, gameOver  } = useGameData()!
  const fade = useSpring( 
    {
      opacity:  selected.length ? 1 : 0
    } 
  )

  useEffect(() => {
    if(selectedWord === 'PONY' && currentStep === 3){
      setCurrentStep(currentStep+1) 
    }
  },[selectedWord])


  return (
  <>
      <Fade top>
        <AppHeader  >Fire Words </AppHeader>
        </Fade>

        <Header >
          {selected.length ?  
            <WordText data-tut={'leters_selected'} style={fade}>
              <IconCheckButton data-tut={'submit'} onClick={() => checkWordLength()} ><AiFillCheckCircle/></IconCheckButton>

              {selectedWord}
              
              <IconCrossButton data-tut={'clear'}  onClick={() =>  {
                currentStep === 2 && setCurrentStep(currentStep+1)
                clearTile() 
              }} ><AiFillCloseCircle/></IconCrossButton>
            </WordText>  :  <div style={{margin: 10,height: 33.5}}/>    }
        </Header>
        <Modal />

        {!gameOver ? <StyledGameBoard key='test' >
          <Fade >  
            {gameBoardState?.columns?.map( 
              (col: Column) =>
                <div style={{  marginTop: gameBoardState?.columns?.length % 2 === 0 ? 25 : 0}} >
                  {col.points.map((point: Position) => <LetterTile tutorial={true} pos={point} />) }
                </div>  
            )  } 
        </Fade>
        </StyledGameBoard> :  <StyledGameBoard/>}
          <Footer>
            <Fade>
              <div> {score} </div>
            </Fade>
          </Footer>
  </>

  );
}

