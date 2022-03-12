import { FC, useState, useContext, createContext } from "react";



type Character = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' 
| 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' 
| 'Y' | 'Z'
interface GameDataContextProps {
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

export interface Position {
  x: number,
  y: number
  letter: Character;
}

export interface Column {
  points: Position[]
}

interface GameBoardState {
  columns: Column[]
}

const randomLetter = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const randomCharacter = characters[Math.floor(Math.random() * characters.length)]
  return randomCharacter
}


const ROWS_COUNT = Array.from(Array(5).keys())
const LONG_COLUMN_COUNT = Array.from(Array(7).keys())
const LONG_COLUMN_INDEXES = [1,3]

const SHORT_COLUMN_COUNT = Array.from(Array(6).keys())
const SHORT_COLUMN_INDEXES = [0,2,4]

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
    const head =  prevState[0]
    const tail =  prevState[prevState.length]

    const SAME_COL_HEAD = (head.x === value.x &&  (head.y-1 === value.y || head.y+1 === value.y))
    const SAME_COL_TAIL = (tail.x === value.x &&  (tail.y-1 === value.y || tail.y+1 === value.y))
    const ADJACENT_COL_HEAD = (head.x === value.x &&  (head.y-1 === value.y || head.y+1 === value.y))
    const ADJACENT_COL_TAIL = (head.x === value.x &&  (head.y-1 === value.y || head.y+1 === value.y))

    return SAME_COL_HEAD || SAME_COL_TAIL || ADJACENT_COL_HEAD || ADJACENT_COL_TAIL
  }

  const appendTile = (value: any) => {
    setSelected( (prevState: any, props: any)  => {
      valiateConnection(prevState, value)
      return [ ...prevState, value]
      
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