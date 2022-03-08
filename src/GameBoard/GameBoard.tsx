import {FC }from 'react';
import styled from 'styled-components';


const StyledGameBoard = styled.div`
  display: flex;
  flex: 1;
  background-color: white;
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

export const GameBoard:FC = () => {
  return (
    <StyledGameBoard>
        {Array.from(Array(5).keys()).map( (xIndex: number) => <div style={{  marginTop: xIndex % 2 === 0 ? 25 : 0}} > 
            {Array.from(Array(xIndex % 2 === 0 ? 6 : 7).keys()).map( (yIndex: number) =>  
            <Square> 
                <div>{randomLetter(xIndex, yIndex)}</div> 
                {/* <DebugPos> {`${xIndex}, ${yIndex}`} </DebugPos>  */}
            </Square> )  }

        </div>  )  }
    </StyledGameBoard>
  );
}

