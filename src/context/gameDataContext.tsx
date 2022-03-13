import { FC, useState, useContext, createContext } from "react";
import {Position, Column,GameBoardState} from '../types'
import { randomLetter } from '../utils'
import { ROWS_COUNT, LONG_COLUMN_COUNT,SHORT_COLUMN_COUNT, LONG_COLUMN_INDEXES } from '../constants'



export interface GameDataContextProps {
  debug: boolean;
  selected: any,
  score: any
  appendTile: Function,
  clearTitles: Function
  gameBoardState: GameBoardState,
  ROWS_COUNT: number[],
  LONG_COLUMN_COUNT: number[],
  SHORT_COLUMN_COUNT: number[]

}
// const SHORT_COLUMN_INDEXES = [0,2,4]

const generateGameState = () => {
    return {columns: ROWS_COUNT.map( (xIndex: number) => xIndex % 2 !== 0 ? 
        { points : LONG_COLUMN_COUNT.map( (yIndex: number) =>  {  
          return {x: xIndex, y: yIndex, letter: randomLetter()} as Position 
        }) } as Column
        : 
        { points : SHORT_COLUMN_COUNT.map( (yIndex: number) =>  {  
          return {x: xIndex, y: yIndex, letter: randomLetter()} as Position 
        })} as Column
    )
  } as GameBoardState
}

export const GameDataContext = createContext<GameDataContextProps| undefined >(undefined);
export const GameDataProvider:FC = ({ children }) => {
  
  const [gameBoardState, setGameBoardState] = useState<any>(generateGameState())!
  const [selected, setSelected] = useState<any>([])!

  const [score, setScore] = useState<any>(100)!


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
  const clearTitles = () => {
    setSelected([])
  } 

  return (
    <GameDataContext.Provider value={{ 
        debug: true,
        selected, 
        score, 
        appendTile, 
        clearTitles,
        gameBoardState,
        ROWS_COUNT,
        SHORT_COLUMN_COUNT,
        LONG_COLUMN_COUNT
      }}>
      {children}
    </GameDataContext.Provider>
  );
};


export const useGameData = () => useContext(GameDataContext);