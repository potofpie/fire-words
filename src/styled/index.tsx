import styled from 'styled-components';
import { animated } from "react-spring";



export const Header = styled.div`
display: flex;
flex: 1;
flex-direction: column;
align-text: center;
align-items: center;
justify-content: space-around;
`;

export const Footer = styled.div`
display: flex;
flex: 1;
width: 100%;
flex-direction: column;
justify-content: center;
`;
export const WordText = styled.div`
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


export const StyledGameBoard = styled.div`
display: flex;
flex: 5;
align-items: center;
justify-content: center;
`;

export const AnimatedSquare = styled(animated.div)`
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

// export const Square = styled.div`
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

export const IconCheckButton = styled.div`
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

export const IconCrossButton = styled.div`
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

export const DebugPos = styled.div`
width: 100%;
font-size: 8px; 
color: grey;
`;



export const AppHeader = styled.div`
  width: 100%;
  font-size: 18px; 
  padding: 10px; 
  color: black;
  background-color: #f2f0e6;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
`;

export const Credit = styled.a`
  font-size: 10px; 
`;