import {FC, useState, useEffect }from 'react';
import HeadShake from 'react-reveal/HeadShake';
import Pulse from 'react-reveal/Pulse';
import Tada from 'react-reveal/Tada';
import { useSpring } from "react-spring";
import { useGameData } from '../../context/gameDataContext'
import {  Position, WordValidationState} from '../../types'
import { isTileSelected } from '../../utils'
import {tempColors} from '../../constants'
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






export const LetterTile:FC<LetterTileProps> = ({pos, /*status*/}) => {
  const [error, setError] = useState<Boolean>(false);
  const [tempTicker, setTempTicker] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<any>(0);


  const  { selected, appendTile, wordValidationState, DEBUG, setGameOver, gameOver } = useGameData()!
  const  tileSelected = isTileSelected({pos,selected}) 


  useEffect(() => setTempTicker(0),[pos.letter])



  const createInterval = () => {
    const interval = setInterval(() => {
      tempTicker < 19 && Math.random() < 0.50 && setTempTicker( (prevState: number) => {
        prevState === 20 && gameOverActions()
        return prevState < 20 ? prevState+1 : prevState
      }
      )
    },2500) 
    return interval
  }

  const gameOverActions = async () => {
    await clearInterval(intervalId)
    await setGameOver(true)
  }




  useEffect(() => { 
    if(gameOver){
      gameOverActions()
    }
    else{
      const interval = createInterval()
      setIntervalId(interval)

    }
  // eslint-disable-next-line
  },[gameOver])
  



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