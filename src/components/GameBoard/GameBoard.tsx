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
  AppHeader
} from '../../styled'




export const GameBoard:FC = () => {
    const  { selected, selectedWord, score, clearTile, gameBoardState, /*status,*/ checkWordLength, gameOver  } = useGameData()!
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
              <WordText style={fade}>
                <IconCheckButton onClick={() => checkWordLength()} ><AiFillCheckCircle/></IconCheckButton>

                {selectedWord}
                
                <IconCrossButton onClick={() => clearTile() } ><AiFillCloseCircle/></IconCrossButton>
              </WordText>  :  <div style={{margin: 10,height: 33.5}}/>    }
          </Header>
          <Modal />

          {!gameOver ? <StyledGameBoard key='test' >
            <Fade >  
              {gameBoardState?.columns?.map( 
                (col: Column) =>
                  <div style={{  marginTop: gameBoardState?.columns?.length % 2 === 0 ? 25 : 0}} >
                    {col.points.map((point: Position) => <LetterTile /*status={ status }*/ pos={point} />) }
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

