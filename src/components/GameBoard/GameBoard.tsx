import {FC, useState }from 'react';
import HeadShake from 'react-reveal/HeadShake';
import { useSpring } from "react-spring";
import {
  AiFillCloseCircle,
  AiFillCheckCircle 
} from 'react-icons/ai'
import { useGameData } from '../../context/gameDataContext'
import { Column, Position} from '../../types'
import { getWord } from '../../utils'

import {Header, Footer, IconCheckButton, IconCrossButton, AnimatedSquare, DebugPos, WordText, StyledGameBoard} from '../../styled'
import {
  useQuery,
} from "react-query";






const determineColor = ({selected, error}: {selected: Boolean, error: Boolean}) => {
  if(error){
    return "#e8ccd7"
  }
  else if(selected){
    return "#c4d8e2"
  }
  else{
    return "#f2f0e6"
  }
}

interface LetterTileProps {
  pos: Position;
}






const LetterTile:FC<LetterTileProps> = ({pos}) => {

  const [error, setError] = useState<Boolean>(false);
  const  { selected, appendTile, debug } = useGameData()!
  const  tileSelected = selected?.filter((selectedPos: Position) => selectedPos.x === pos.x && selectedPos.y === pos.y)?.length



  const colorFade = useSpring({
    backgroundColor:  determineColor({error, selected: tileSelected })
  })


  return (
    
    <HeadShake when={error} >
      <AnimatedSquare style={colorFade} key={`${pos.x}, ${pos.y}`} onClick={() => appendTile(pos, setError) }> 
          <div>{pos?.letter}</div> 
          {debug ? <DebugPos> {`${pos.x}, ${pos.y}`} </DebugPos>  : <></> }
          
      </AnimatedSquare>
    </HeadShake>
  

  )

}


export const GameBoard:FC = () => {
  // const { status, data, error, isFetching } = useWord();

    const  { selected, score, clearTitles, gameBoardState  } = useGameData()!
    const { /*status,*/ data, /* error, isFetching,*/ refetch } = useQuery(
      ['word',selected.map((pos: Position) => pos.letter).join("")], 
      () => getWord(selected.map((pos: Position) => pos.letter).join("")),
      {
        enabled: false,
      }
    );



    return (
    <>
        <Header>
          {selected.length ?  
            <WordText>
              <IconCheckButton onClick={() => {console.log(selected.join("")); refetch(); clearTitles();  }} ><AiFillCheckCircle/></IconCheckButton>
              {selected.map((pos: Position) => pos.letter).join("") }
              <IconCrossButton onClick={() => clearTitles() } ><AiFillCloseCircle/></IconCrossButton>
            </WordText>  :  <div style={{margin: 10,height: 33.5}}/>    }
        </Header>

        <StyledGameBoard key='gameboard'>
            {gameBoardState?.columns?.map( 
              (col: Column) =>
                <div style={{  marginTop: gameBoardState?.columns?.length % 2 === 0 ? 25 : 0}} >
                  {col.points.map((point: Position) => <LetterTile pos={point} />) }
                </div>  
            )  }
        </StyledGameBoard>
        {
          console.log(data)
          // data?.map((t: Word) =>console.log(t.word))
        }
        <Footer>
            <div> {score} </div>
        </Footer>
    </>
    );
}

