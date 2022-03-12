
import {FC }from 'react';
import styled from 'styled-components';

import {
  AiFillCloseCircle,
  AiFillCheckCircle 
} from 'react-icons/ai'

import { useGameData, Column, Position} from '../context/gameDataContext'



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

const Square = styled.div`
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

const IconCheckButton = styled.div`
  display: flex;
  align-items: center;
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



const randomLetter = (x:number, y:number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const randomCharacter = characters[Math.floor(Math.random() * characters.length)]
  return randomCharacter
}



interface LetterTileProps {
    pos: Position;
}

const LetterTile:FC<LetterTileProps> = ({pos}) => {
    const  { appendTile, debug } = useGameData()!
    return (
        <Square key={`${pos.x}, ${pos.y}`} onClick={() => appendTile(pos?.letter) }> 
            <div>{pos?.letter}</div> 
            {debug ? <DebugPos> {`${pos.x}, ${pos.y}`} </DebugPos>  : <></> }
             
        </Square>   

    )

}

// const rows = Array.from(Array(5).keys())
// const longCol = Array.from(Array(7).keys())
// const shortCol = Array.from(Array(6).keys())



export const GameBoard:FC = () => {
    const  { selected, score, clearTitles, gameBoardState  } = useGameData()!

    return (
    <>
        <Header>
          {selected.length ?  
            <WordText>
              <IconCheckButton onClick={() => {console.log(selected.join("")); clearTitles();}  } ><AiFillCheckCircle/></IconCheckButton>
              {selected.join("")}
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

