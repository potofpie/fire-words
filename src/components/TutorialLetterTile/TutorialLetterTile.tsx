import {FC, useState }from 'react';
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






export const TutorialLetterTile:FC<LetterTileProps> = ({pos, }) => {
  const tileIndex = Number(`${pos.x}${pos.y}`)

  const [error, setError] = useState<Boolean>(false);
  const [tempTicker, setTempTicker] = useState<number>(0);
  const  { selected, appendTile, wordValidationState, DEBUG } = useGameData()!
  const  tileSelected = isTileSelected({pos,selected}) 


  const createTimeout = () => {
    setTimeout(() => {
      // setTest(true)
      setTempTicker(tileIndex === 14 ? 15 : 0)
    },250) 
  }






  createTimeout()

  



  const colorFade = useSpring( 
    {
      backgroundColor:  determineBackgroundColor({error, selected: tileSelected, wordValidationState, tempTicker }),
      border: tileSelected ? 'solid 3px #e9d66b' : 'solid 3px transparent'
    } 
  )


  return (
    <div data-tut={`${pos.x}${pos.y}`}>

    <Tada  when={wordValidationState === 'success' && tileSelected} >
      <HeadShake when={ error || (wordValidationState === 'error' && tileSelected)} >

        <Pulse when={tempTicker > 10} forever={true} >
        <AnimatedSquare  style={colorFade}  onClick={() => appendTile(pos, setError) }> 
            <div >{pos?.letter}</div> 
            {DEBUG ? <DebugPos> {tempTicker} </DebugPos>  : <></> }

            {DEBUG ? <DebugPos> {`${pos.x}, ${pos.y}`} </DebugPos>  : <></> }
            
        </AnimatedSquare>
        </Pulse>

      </HeadShake>
    </Tada>
    </div>

  )

}