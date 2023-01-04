import {FC, useState, useEffect }from 'react';
import HeadShake from 'react-reveal/HeadShake';
import Pulse from 'react-reveal/Pulse';
import Tada from 'react-reveal/Tada';
import { useSpring } from "react-spring";
import { useGameData } from '../../context/gameDataContext'
import {  Position, WordValidationState} from '../../types'
import { isTileSelected } from '../../utils'
import {tempColors, ERROR, GREEN, DEBUG} from '../../constants'
import {
  AnimatedSquare, 
  DebugPos, 
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
    return ERROR
  }
  else if(wordValidationState === 'success' && selected){
    return GREEN
  }
  else{
    return tempColors[tempTicker]
  }
}

interface LetterTileProps {
  value: Position 
  onClick?: (pos: Position) => void
}




const defaultOnClick = (pos: Position) => {

}

export const LetterTile:FC<LetterTileProps> = ({value, onClick = defaultOnClick }) => {
  const { x, y , letter } = value;

  if(letter !== ' '){
    console.log({...value})
  } 
  return (
    <Tada when={false} >
      <HeadShake when={ false} >
        <Pulse when={false} forever={true} >

        <AnimatedSquare  key={`${x}, ${y}`} onClick={() => onClick(value)}> 
            <div>{letter}</div> 
            {DEBUG ? <DebugPos> {`${x}, ${y}`} </DebugPos>  : <></> } 
        </AnimatedSquare>
        </Pulse>

      </HeadShake>
    </Tada>

  )

}