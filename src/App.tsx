import {FC }from 'react';
import styled from 'styled-components';

const StyledApp = styled.div`
  display: flex;
  flex: 1;
  background-color: white;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Square = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px; 
  font-weight: 600;
  justify-content: center;
  width: 50px;
  height: 50px;
  margin: 5px;
  background-color: #f2f0e6;
  color: black; 
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
`;

const Header = styled.div`
  width: 100%;
  font-size: 18px; 
  padding: 10px; 
  color: black;
  background-color: #f2f0e6;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);

  // border-bottom: solid 1px black;
`;


const randomLetter = () => {
  // function randomIntFromInterval(min, max) { // min and max included 
  const letter =  Math.floor(Math.random() * 27)
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  return characters.charAt(letter)

}

export const App:FC = () => {
  return (
    <>
      <Header>Fire Words</Header>
    <StyledApp>
      {Array.from(Array(5).keys()).map( (index: number) => <div style={{  marginTop: index % 2 === 0 ? 25 : 0}} > 
        {Array.from(Array(index % 2 === 0 ? 5 : 6).keys()).map( (index: number) =>  <Square> <div>{randomLetter()}</div> </Square> )  }

      </div>  )  }
    </StyledApp>
    </>
  );
}

