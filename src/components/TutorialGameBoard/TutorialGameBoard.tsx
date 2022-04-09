import {FC }from 'react';
import {TutorialLetterTile} from '../TutorialLetterTile';
import Fade from 'react-reveal/Fade';
import { useSpring } from "react-spring";
import {
  AiFillCloseCircle,
  AiFillCheckCircle 
} from 'react-icons/ai'
import { useTour } from '@reactour/tour'
import { useGameData } from '../../context/gameDataContext'
import { Modal } from '../Modal'
import { TUTORIAL_BOARD} from '../../constants/tutorialBoard'

import {
  Header, 
  Footer, 
  IconCheckButton, 
  IconCrossButton, 
  WordText, 
  StyledGameBoard, 
  AppHeader
} from '../../styled'




export const TutorialGameBoard:FC = () => {
    const { setIsOpen } = useTour();
    setIsOpen(true)

    const  { selected, selectedWord, score, clearTile, checkWordLength  } = useGameData()!
    const fade = useSpring( 
      {
        opacity:  selected.length ? 1 : 0
      } 
    )


    return (
    <>

        <Fade top>
          <AppHeader  >Fire Words </AppHeader>
          </Fade>

          <Header >
            {selected.length ?  
              <WordText data-tut={"selected_word"} style={fade}>
                <IconCheckButton onClick={() => checkWordLength()} ><AiFillCheckCircle/></IconCheckButton>

                {selectedWord}
                
                <IconCrossButton onClick={() => clearTile() } ><AiFillCloseCircle/></IconCrossButton>
              </WordText>  :  <div style={{margin: 10,height: 33.5}}/>    }
          </Header>
          <Modal />

          <StyledGameBoard key='test' >
            <Fade >  
              {TUTORIAL_BOARD?.columns?.map( 
                (col: any, cindex: number) =>
                <div style={{  marginTop: TUTORIAL_BOARD?.columns?.length % 2 === 0 ? 25 : 0}} >
                    {col.points.map((point: any, pindex: number) => <TutorialLetterTile  pos={point} />) }
                  </div>  
              )  } 
          </Fade>
          </StyledGameBoard> 
            <Footer>
              <Fade>
                <div> {score} </div>
              </Fade>
            </Footer>
    </>
    );
}

