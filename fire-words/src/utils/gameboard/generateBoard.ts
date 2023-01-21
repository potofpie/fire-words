import { LONG_COLUMN_INDEXES } from "../../constants";
import { getSeedTiles } from "./getSeedTiles";
import { TileData, Gameboard, Column } from "./types";
import probz from '../../probabilities/output.json'

import { getRandomLetterFromWeights } from './getRandomLetterFromWeights'



const isFirstOrLast = (tile: TileData, isLong: boolean) => tile.y == 0 || tile.y ==  (isLong ? 5 : 6)
const hasUpperNeighbor = (tile: TileData) => tile.y != 0
const hasDownwardNeighbor = (tile: TileData, isLong: boolean) => tile.y !=  (isLong ? 5 : 6)

const hasLeftNeighbor = (tile: TileData) => tile.x !=  0
const hasRightNeighbor = (tile: TileData) => tile.x !=  4



// TODO: this function need work
const findNeighbors  = (board: Gameboard, tile: TileData): TileData[] => {
    const neighbors: TileData[] = [];
    const isLong = LONG_COLUMN_INDEXES.includes(tile.x);


    // console.log({tile})
    if(hasUpperNeighbor(tile)){
        neighbors.push(board.columns[tile.x].tiles[tile.y-1])
    }
    if(hasDownwardNeighbor(tile, isLong)){
        neighbors.push(board.columns[tile.x].tiles[tile.y+1])
    }

    if(hasLeftNeighbor(tile)){
      neighbors.push(board.columns[tile.x-1].tiles[tile.y])
      if(isLong){

      }
    } 
    if(hasRightNeighbor(tile)){
      if(isLong){
        neighbors.push(board.columns[tile.x+1].tiles[tile.y])
      }
      else {
        neighbors.push(board.columns[tile.x+1].tiles[tile.y])
        neighbors.push(board.columns[tile.x+1].tiles[tile.y+1])
      }
    } 

    return neighbors;
  }

const generateColumn = (x: number, seedTiles: TileData[]): Column => {
  const isLong = ((x+1)%2) != 0;
  const tiles: TileData[] =  Array.from({ length: isLong ? 6 : 7 }).map((_,y) => ({ 
      x,
      y, 
      letter: seedTiles.find((t) =>  t.x === x && t.y === y )?.letter ?? " ",
      selected: false
  }))
  return {tiles};
}


const zipProbabilities = (p1: any, p2: any ) => {
  const probs = {...p1}
  Object.keys(p2).forEach((key: string) => {
    if(!Object.keys(probs).includes(key)){
      probs[key] = p2[key]
    }
    else {
      probs[key] =  (probs[key]  + p2[key])/2
    }

  })
  // console.log({probs})
  return probs
}


type Letter = 'a'
const walkAndGenerate = (_gameboard: Gameboard, tile: TileData): Gameboard => {
  const gameboard = {..._gameboard}
  const ns = findNeighbors(gameboard, tile)
  console.log({ns})
  ns.forEach((t) => {
    if(t.letter == ' '){
      const nsOfBlank = findNeighbors(gameboard, t).filter((_t) => _t.letter != ' ' );
      console.log({nsOfBlank})
      const averagedProbs = nsOfBlank.reduce((prev, next) => {
        const letter = next.letter.toLowerCase() as Letter;
        const letterProbs = probz[letter]
        return zipProbabilities(prev, letterProbs)
      },{})
      const tx = t.x
      const ty = t.y
      console.log({averagedProbs})
      const randomLetter = getRandomLetterFromWeights(averagedProbs) || ' '
      console.log({randomLetter})
      gameboard.columns[tx].tiles[ty].letter =  randomLetter 
    }
    // else {
    //   walkAndGenerate(gameboard,tile);
    // }
  })
  // console.log({gameboard})
  return gameboard;
}




export const generateBoard = (): Gameboard => {
  const seedTiles = getSeedTiles()
  const columns = Array.from({ length: 5 }).map((_,x) => generateColumn(x, seedTiles))
  const board = {columns} 
  // console.log(seedTiles[0])
  console.log(findNeighbors(board,seedTiles[0]))
  return walkAndGenerate(board,seedTiles[0])
};
