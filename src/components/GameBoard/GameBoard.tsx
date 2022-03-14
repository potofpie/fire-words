import {FC, useState, useEffect }from 'react';
import HeadShake from 'react-reveal/HeadShake';
import Tada from 'react-reveal/Tada';
import { useSpring } from "react-spring";
import {
  AiFillCloseCircle,
  AiFillCheckCircle 
} from 'react-icons/ai'
import { useGameData } from '../../context/gameDataContext'
import { Column, Position, WordValidationState} from '../../types'
import { isTileSelected } from '../../utils'
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
    wordValidationState
  }
    : 
    {
      selected: Boolean, 
      error: Boolean, 
      wordValidationState: WordValidationState
    }
  ) => {
    // console.log(wordValidation, selected)
  if(error || (wordValidationState === 'error' && selected) ) {
    return "#e8ccd7"
  }
  else if(wordValidationState === 'success' && selected){
    return "#e9ffdb"
  }
  else if(wordValidationState === 'idle' && selected){
    return "#f2f0e6" //"#c4d8e2"
  }
  else{
    return "#f2f0e6"
  }
}

interface LetterTileProps {
  pos: Position;
  // status?: WordValidationState;
}






const LetterTile:FC<LetterTileProps> = ({pos, /*status*/}) => {
  const [error, setError] = useState<Boolean>(false);
  const  { selected, appendTile, wordValidationState, DEBUG } = useGameData()!
  const  tileSelected = isTileSelected({pos,selected}) 
  const colorFade = useSpring( 
    {
      backgroundColor:  determineBackgroundColor({error, selected: tileSelected, wordValidationState }),
      border: tileSelected ? 'solid 3px #e9d66b' : 'solid 3px #f2f0e6'
    } 
  )




  return (
    
    <Tada when={wordValidationState === 'success' && tileSelected} >
      <HeadShake when={ error || (wordValidationState === 'error' && tileSelected)} >
        <AnimatedSquare style={colorFade} key={`${pos.x}, ${pos.y}`} onClick={() => appendTile(pos, setError) }> 
            <div>{pos?.letter}</div> 
            {DEBUG ? <DebugPos> {`${pos.x}, ${pos.y}`} </DebugPos>  : <></> }
            
        </AnimatedSquare>
      </HeadShake>
    </Tada>
  

  )

}


export const GameBoard:FC = () => {
  // const { status, data, error, isFetching } = useWord();

    const  { selected, selectedWord, score, clearTile, gameBoardState, /*status,*/ checkWordLength, bumpScore  } = useGameData()!






    return (
    <>
        <Header>
          {selected.length ?  
            <WordText>
              <IconCheckButton onClick={() => checkWordLength()} ><AiFillCheckCircle/></IconCheckButton>

              {selectedWord}
              
              <IconCrossButton onClick={() => clearTile() } ><AiFillCloseCircle/></IconCrossButton>
            </WordText>  :  <div style={{margin: 10,height: 33.5}}/>    }
        </Header>

        <StyledGameBoard key='gameboard'>
            {gameBoardState?.columns?.map( 
              (col: Column) =>
                <div style={{  marginTop: gameBoardState?.columns?.length % 2 === 0 ? 25 : 0}} >
                  {col.points.map((point: Position) => <LetterTile /*status={ status }*/ pos={point} />) }
                </div>  
            )  }
        </StyledGameBoard>
        <Footer>
            <div> {score} </div>
        </Footer>
    </>
    );
}

