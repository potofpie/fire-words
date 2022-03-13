import { FC, useState, useContext, createContext, useEffect } from "react";
import {Position, Column,GameBoardState, WordValidationState} from '../types'
import { randomLetter, validateWord } from '../utils'
import { ROWS_COUNT, LONG_COLUMN_COUNT,SHORT_COLUMN_COUNT, LONG_COLUMN_INDEXES, DEBUG } from '../constants'
import {
  useQuery,
  QueryStatus
} from "react-query";



export interface GameDataContextProps {
  selected: any,
  selectedWord: string,
  score: any
  wordValidationState: WordValidationState,
  gameBoardState: GameBoardState,
  appendTile: Function,
  clearTile: Function,
  checkWordLength: Function,
  DEBUG: boolean,
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
  const [wordValidationState, setWordValidationState] = useState<WordValidationState>('idle')!
  const [selected, setSelected] = useState<any>([])!
  const [score, setScore] = useState<any>(100)!



  

  const checkWordLength = () => {
    if(selected?.length < 3){
      setWordValidationState('error')
      setTimeout( () => {
        setWordValidationState('idle')
        clearTile();
      }, 500);
    }
    else{
      console.log(selected.map((pos: Position) => pos.letter).join(""));
      validateWord(
        selected.map((pos: Position) => pos.letter).join(""),
        setWordValidationState,
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
        // status: wordValidationState,
        selectedWord: selected.map((pos: Position) => pos.letter).join(""), 
        score, 

        checkWordLength,
        appendTile, 
        clearTile,
        wordValidationState,

        DEBUG,
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