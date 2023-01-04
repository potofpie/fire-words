export interface TileData {
  x: number
  y: number
  letter: string;
  selected: boolean;
  error?: boolean;
  success?: boolean;
}

export interface Column {
  tiles: TileData[]
}

export interface Gameboard {
  columns: Column[]
}

export interface GameboardState {
  gameboard: Gameboard
  selected: TileData[]
}