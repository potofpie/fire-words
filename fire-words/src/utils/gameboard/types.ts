export type XValues = IntRange<0, 6>

export type YValues = IntRange<0, 7>
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

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

