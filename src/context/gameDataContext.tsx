import { FC, useState, useContext, createContext } from "react";
import weightedRandomObject from "weighted-random-object"
import {Position, Column,GameBoardState, WordValidationState, Character} from '../types'
import { letters, validateWord, isTileSelected } from '../utils'

import { ROWS_COUNT, LONG_COLUMN_COUNT,SHORT_COLUMN_COUNT, LONG_COLUMN_INDEXES, DEBUG } from '../constants'




export interface GameDataContextProps {
  selected: any,
  selectedWord: string,
  score: any
  wordValidationState: WordValidationState,
  gameOver:boolean,
  gameBoardState: GameBoardState,
  enabled: boolean
  setEnabled: Function,
  setGameOver:Function,
  appendTile: Function,
  clearTile: Function,
  checkWordLength: Function,
  restart: Function,
  flippedSelectedTiles: Function,
  bumpScore: Function,
  setScore: Function,
  DEBUG: boolean,
  ROWS_COUNT: number[],
  LONG_COLUMN_COUNT: number[],
  SHORT_COLUMN_COUNT: number[]
}


const getAgecentTiles = ({pos,selected, gameBoardState} : {pos:Position,selected:any[],  gameBoardState:GameBoardState}) => {
    // const { x , y } = pos

}

const generateGameState = () => {
    return {columns: ROWS_COUNT.map( (xIndex: number) => 
      xIndex % 2 !== 0 ? 
        { 
          points : LONG_COLUMN_COUNT.map( (yIndex: number) =>  {  
            const letter = weightedRandomObject(letters);
            return { x: xIndex, y: yIndex, letter: letter.value } as Position ;
          }) 
        } as Column
        : 
        { 
          points : SHORT_COLUMN_COUNT.map( (yIndex: number) =>  {  
            const letter = weightedRandomObject(letters);
            return { x: xIndex, y: yIndex, letter: letter.value} as Position ;

          })
       } as Column
    )
  } as GameBoardState
}




// const generateGameState2 = () => {
//   return {columns: ROWS_COUNT.map( (xIndex: number) => 
//     xIndex % 2 !== 0 ? 
//       { 
//         points : LONG_COLUMN_COUNT.map( (yIndex: number) =>  {  
//           const letter = weightedRandomObject(letters);
//           return { x: xIndex, y: yIndex, letter: letter.value } as Position ;
//         }) 
//       } as Column
//       : 
//       { 
//         points : SHORT_COLUMN_COUNT.map( (yIndex: number) =>  {  
//           const letter = weightedRandomObject(letters);
//           return { x: xIndex, y: yIndex, letter: letter.value} as Position ;

//         })
//      } as Column
//   )
// } as GameBoardState
// }

export const GameDataContext = createContext<GameDataContextProps| undefined >(undefined);
export const GameDataProvider:FC = ({ children }) => {
  const [gameBoardState, setGameBoardState] = useState<any>(generateGameState())!
  const [wordValidationState, setWordValidationState] = useState<WordValidationState>('idle')!
  const [selected, setSelected] = useState<any>([])!
  const [score, setScore] = useState<any>(0)!
  const [gameOver, setGameOver] = useState<boolean>(false)!
  const [enabled, setEnabled] = useState(false)
  const restart = () => setGameBoardState(generateGameState())
  const checkWordLength = () => {
    if(selected?.length < 3){
      setWordValidationState('error')
      setTimeout( () => {
        setWordValidationState('idle')
        clearTile();
      }, 500);
    }
    else{
      validateWord(
        selected.map((pos: Position) => pos.letter).join(""),
        setWordValidationState,
        flippedSelectedTiles,
        bumpScore,
        clearTile
      );
    }
  }


  const valiateConnection = (prevState: any, value: Position) => {
    if(!prevState.length){
      return true

    }
    const tail =  prevState[prevState.length-1]
    // Internal to function
    const ADJACENT_COL_TAIL = (tail.x+1 === value.x || tail.x-1 === value.x)
    const LONG_NEAR_ROW_TAIL = (tail.y === value.y || tail.y-1 === value.y)
    const SHORT_NEAR_ROW_TAIL = (tail.y === value.y || tail.y+1 === value.y) 
    const NEAR_ROW = LONG_COLUMN_INDEXES.includes(tail.x) ? LONG_NEAR_ROW_TAIL : SHORT_NEAR_ROW_TAIL
    const SAME_COL_TAIL = (tail.x === value.x &&  (tail.y-1 === value.y || tail.y+1 === value.y))
    const ADJACENT_TILE_TAIL = ADJACENT_COL_TAIL && NEAR_ROW
    return SAME_COL_TAIL || ADJACENT_TILE_TAIL
  }
  const bumpScore = () => {
    setScore( score + (100 * selected.length))
  }

  const flippedSelectedTiles = () => {
    setGameBoardState( (prevState: GameBoardState, props: any)  => {
      console.log(prevState)
      const modifiedColumns = prevState.columns.map((c: Column) => {
          const modifiedPoints = c.points.map((p: Position) => {
            if(isTileSelected({pos: p, selected})){
              const letter = weightedRandomObject(letters)
              p.letter = letter.value as Character
              return p
            }
            return p
          }
          )
          return {points:modifiedPoints} as Column
        }
      )

      return {columns : modifiedColumns} as GameBoardState
    }
    
    )
  } 

  const appendTile = (value: any, setError: Function) => {
    setSelected( (prevState: any, props: any)  => {
      if(valiateConnection(prevState, value)){
        return [ ...prevState, value]
      }
      else {
        setError(true)
        setTimeout( () => setError(false), 500);
        return [ ...prevState]
      }
    }
    
    )

  } 
  const clearTile = () => {
    setSelected([])
  } 

  return (
    <GameDataContext.Provider value={{ 
        selected,
        selectedWord: selected.map((pos: Position) => pos.letter).join(""), 
        score, 
        wordValidationState,
        gameOver,

        setGameOver,
        checkWordLength,
        appendTile, 
        clearTile,
        flippedSelectedTiles,
        bumpScore,
        restart,
        setEnabled,
        setScore,

        
        enabled, 
        DEBUG,
        gameBoardState,
        ROWS_COUNT,
        SHORT_COLUMN_COUNT,
        LONG_COLUMN_COUNT
      }}>
      {getAgecentTiles({
          pos: {x:1,y:1, letter: 'G'} as Position,
          selected,
          gameBoardState
        })}
      {children}
    </GameDataContext.Provider>
  );
};


export const useGameData = () => useContext(GameDataContext);