
import probabilities from '../../probabilities/output.json'
import { getRandomLetterFromWeights } from './getRandomLetterFromWeights'
import { getRandomInt } from './getRandomInt'
import { TileData } from './types'
export const getSeedTiles = (): TileData[] => {
    const points: TileData[] = []
    while (points.length <= 2) {
      const x = getRandomInt(5)
      const xIsEven = (x + 1) % 2 === 0
      const y = xIsEven ? getRandomInt(7) : getRandomInt(6);
      const letter = getRandomLetterFromWeights(probabilities) ?? ' '
      if(points.every((p) => p.x != x && p.y != y) ){
        points.push({x,y,letter, selected: false})
      }
    }
   return points;
} 