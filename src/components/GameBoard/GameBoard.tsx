import {FC }from 'react';
import {LetterTile} from '../LetterTile';
import Fade from 'react-reveal/Fade';
import { useSpring } from "react-spring";
import {
  AiFillCloseCircle,
  AiFillCheckCircle,
  AiOutlineQuestionCircle 
} from 'react-icons/ai'

import {useNavigate } from "react-router-dom";
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
import { useEffect } from 'react';




export const GameBoard:FC = () => {
    let navigate = useNavigate();

    const  { selected, selectedWord, score, clearTile, gameBoardState, setScore, checkWordLength, gameOver  } = useGameData()!
    const fade = useSpring( 
      {
        opacity:  selected.length ? 1 : 0
      } 
    )
    useEffect(() => {
      const reset = () => {

        setScore(0)
      }
      reset
      
      ()
    }, [gameOver])



    return (
    <>
        <Fade top>
          
          <AppHeader>   <AiOutlineQuestionCircle style={{color: "#f2f0e6"}}/> <div>Fire Words</div>  <AiOutlineQuestionCircle onClick={() => navigate('tutorial')}/> </AppHeader>
          
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

