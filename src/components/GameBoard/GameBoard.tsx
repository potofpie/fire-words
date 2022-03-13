import {FC, useState }from 'react';
import styled from 'styled-components';
import HeadShake from 'react-reveal/HeadShake';
import { useSpring, animated } from "react-spring";
import {
  AiFillCloseCircle,
  AiFillCheckCircle 
} from 'react-icons/ai'

import { useGameData } from '../../context/gameDataContext'
import { Column, Position} from '../../types'
import { checkWord } from '../../utils'



const Header = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-text: center;
  align-items: center;
  justify-content: space-around;
`;

const Footer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: center;
`;
const WordText = styled.div`
  display: flex;
  background-color: #f2f0e6;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  border-radius: 10px;
  margin: 7px;
  padding: 7px;
  flex-direction: row;
  align-text: center;
  align-items: center;
  justify-content: center;
`;


const StyledGameBoard = styled.div`
  display: flex;
  flex: 5;
  align-items: center;
  justify-content: center;
`;

const AnimatedSquare = styled(animated.div)`
  display: flex;
  align-items: center;
  flex-direction: row;
  font-size: 20px; 
  font-weight: 600;
  justify-content: center;
  width: 50px;
  height: 50px;
  margin: 5px;
  flex-direction: column;
  background-color: #f2f0e6;
  color: black; 
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
`;

// const Square = styled.div`
//   display: flex;
//   align-items: center;
//   flex-direction: row;
//   font-size: 20px; 
//   font-weight: 600;
//   justify-content: center;
//   width: 50px;
//   height: 50px;
//   margin: 5px;
//   flex-direction: column;
//   background-color: #f2f0e6;
//   color: black; 
//   border-radius: 5px;
//   box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
//   &:hover {
//     box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
//   }
// `;

const IconCheckButton = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  justify-content: center;
  margin-right: 5px; 
  color: green;
  &:hover {
    color: darkgreen; 
  }
`;

const IconCrossButton = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  justify-content: center;
  margin-left: 5px; 
  color: red;
  &:hover {
    color: #8b0000; 
  }
`;

const DebugPos = styled.div`
  width: 100%;
  font-size: 8px; 
  color: grey;
`;





interface LetterTileProps {
  pos: Position;
}

interface LetterTileProps {
  pos: Position;
}


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
    const  { selected, score, clearTitles, gameBoardState  } = useGameData()!

    return (
    <>
        <Header>
          {selected.length ?  
            <WordText>
              <IconCheckButton onClick={() => {console.log(selected.join("")); checkWord(selected.map((pos: Position) => pos.letter).join("")); clearTitles();}  } ><AiFillCheckCircle/></IconCheckButton>
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
        <Footer>
            <div> {score} </div>
        </Footer>
    </>
    );
}

