
export type Character = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' 
| 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' 
| 'Y' | 'Z' | ' '

export type Word = {
  word: string;
};


export type WordValidationState =  "error" | "idle" | "success"
export interface Position {
  x: number,
  y: number
  letter: string;
}

export interface Column {
  points: Position[]
}

export interface GameBoardState {
  columns: Column[]
}



