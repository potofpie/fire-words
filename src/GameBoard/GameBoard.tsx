import {FC }from 'react';
import styled from 'styled-components';
import { useGameData} from '../context/gameDataContext'




const Header = styled.div`
  display: flex;
  margin: 10px;
  flex-direction: column;
  align-text: center;
  align-items: center;
  justify-content: space-around;
`;

const Footer = styled.div`
  display: flex;
  margin: 15px;
  width: 100%;
  flex-direction: row;
  align-text: center;
  justify-content: space-around;


  align-items: center;
  justify-content: space-around;
`;
const WordText = styled.div`
  background-color: #f2f0e6;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  border-radius: 10px;
  margin: 7px;
  padding: 7px;
  flex-direction: column;
  align-text: center;
  align-items: center;
  justify-content: space-around;
`;

const Score = styled.div`
  display: flex;
  flex: 1;
  background-color: white;
  flex-direction: row;
  align-text: center;

  align-items: center;
  justify-content: space-around;
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


interface Position {
    x: number;
    y: number;
}

interface LetterTileProps {
    pos: Position;
}

const LetterTile:FC<LetterTileProps> = ({pos}) => {
    const  { selected, score, appendTile } = useGameData()!
    const letter = randomLetter(pos.x, pos.y)
    return (
        <Square key={`${pos.x}, ${pos.y}`} onClick={() => appendTile(letter) }> 
            <div>{letter}</div> 
            {/* <DebugPos> {`${pos.x}, ${pos.y}`} </DebugPos>  */}
        </Square>   

    )

}

const rows = Array.from(Array(5).keys())
const longCol = Array.from(Array(7).keys())
const shortCol = Array.from(Array(6).keys())



export const GameBoard:FC = () => {
    const  { selected, score, clearTitles } = useGameData()!

    return (
    <>
            <Header>
            {selected.length ?  <WordText>{selected.join("")}</WordText> : <div style={{margin: 10,height: 33.5}}/>  }
            </Header>

        <StyledGameBoard key='gameboard'>


            
            {rows.map( (xIndex: number) => 
            <div style={{  marginTop: xIndex % 2 === 0 ? 25 : 0}} > 
                {
                    xIndex % 2 !== 0 ? 
                    longCol.map( (yIndex: number) =>  <LetterTile pos={{x: xIndex, y: yIndex} as Position} />) 
                    : 
                    shortCol.map( (yIndex: number) =>  <LetterTile pos={{x: xIndex, y: yIndex} as Position} />)
                    
                }
            
            </div>  
            )  }
        </StyledGameBoard>


            <Footer>
                <button> enter </button>
                <div> {score} </div>
                <button onClick={() => clearTitles()}> clear</button>
            </Footer>
    </>
    );
}

