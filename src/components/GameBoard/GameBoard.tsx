import {FC, useState, useEffect }from 'react';
import HeadShake from 'react-reveal/HeadShake';
import Pulse from 'react-reveal/Pulse';

// import Shake from 'react-reveal/Shake';

import Tada from 'react-reveal/Tada';
import { useSpring } from "react-spring";
import {
  AiFillCloseCircle,
  AiFillCheckCircle 
} from 'react-icons/ai'
import { useGameData } from '../../context/gameDataContext'
import { Column, Position, WordValidationState} from '../../types'
import { isTileSelected } from '../../utils'
import {tempColors} from '../../constants'
import {
  Header, 
  Footer, 
  IconCheckButton, 
  IconCrossButton, 
  AnimatedSquare, 
  DebugPos, 
  WordText, 
  StyledGameBoard
} from '../../styled'







const determineBackgroundColor = (
  {
    selected, 
    error, 
    wordValidationState,
    tempTicker
  }
    : 
    {
      selected: Boolean, 
      error: Boolean, 
      wordValidationState: WordValidationState,
      tempTicker: number
    }
  ) => {
    // console.log(wordValidation, selected)
  if(error || (wordValidationState === 'error' && selected) ) {
    return "#e8ccd7"
  }
  else if(wordValidationState === 'success' && selected){
    return "#e9ffdb"
  }
  else{
    return tempColors[tempTicker]
  }
}

interface LetterTileProps {
  pos: Position;
}






const LetterTile:FC<LetterTileProps> = ({pos, /*status*/}) => {
  const [error, setError] = useState<Boolean>(false);
  const [tempTicker, setTempTicker] = useState<number>(0);

  const  { selected, appendTile, wordValidationState, DEBUG, setGameOver } = useGameData()!
  const  tileSelected = isTileSelected({pos,selected}) 


  useEffect(() => setTempTicker(0),[pos.letter])

  useEffect(() => {
    setInterval(() => {
        tempTicker < 19 && Math.random() < 0.5 && setTempTicker( (prevState: number) => {
          prevState === 20 && setGameOver(true)
          return prevState < 20 ? prevState+1 : prevState
        }
        )
      },1000) 
  },[])





  const colorFade = useSpring( 
    {
      backgroundColor:  determineBackgroundColor({error, selected: tileSelected, wordValidationState, tempTicker }),
      border: tileSelected ? 'solid 3px #e9d66b' : 'solid 3px transparent'
    } 
  )




  return (
    
    <Tada when={wordValidationState === 'success' && tileSelected} >
      <HeadShake when={ error || (wordValidationState === 'error' && tileSelected)} >
        <Pulse when={tempTicker > 10} forever={true} >

        <AnimatedSquare style={colorFade} key={`${pos.x}, ${pos.y}`} onClick={() => appendTile(pos, setError) }> 
            <div>{pos?.letter}</div> 
            {DEBUG ? <DebugPos> {tempTicker} </DebugPos>  : <></> }

            {DEBUG ? <DebugPos> {`${pos.x}, ${pos.y}`} </DebugPos>  : <></> }
            
        </AnimatedSquare>
        </Pulse>

      </HeadShake>
    </Tada>
  

  )

}


export const GameBoard:FC = () => {
  // const { status, data, error, isFetching } = useWord();

    const  { selected, selectedWord, score, clearTile, gameBoardState, /*status,*/ checkWordLength, gameOver  } = useGameData()!
    const fade = useSpring( 
      {
        opacity:  selected.length ? 1 : 0
      } 
    )

    const gameFade = useSpring( 
      {
        opacity:  gameOver ? 1 : 0
      } 
    )








    return (
    <>
        <Header>
          {selected.length ?  
            <WordText style={fade}>
              <IconCheckButton onClick={() => checkWordLength()} ><AiFillCheckCircle/></IconCheckButton>

              {selectedWord}
              
              <IconCrossButton onClick={() => clearTile() } ><AiFillCloseCircle/></IconCrossButton>
            </WordText>  :  <div style={{margin: 10,height: 33.5}}/>    }
        </Header>

         { !gameOver && <StyledGameBoard key='test' >
            {gameBoardState?.columns?.map( 
              (col: Column) =>
                <div style={{  marginTop: gameBoardState?.columns?.length % 2 === 0 ? 25 : 0}} >
                  {col.points.map((point: Position) => <LetterTile /*status={ status }*/ pos={point} />) }
                </div>  
            )  } 
        </StyledGameBoard>}
        <Footer>
            <div> {score} </div>
        </Footer>
    </>
    );
}

