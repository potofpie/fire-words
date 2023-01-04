import { TileData } from "./types"


export const validateTileConnection = (selectedTiles: TileData[], value: TileData) => {
  const LONG_COLUMN_INDEXES = [1,3]
  if(!selectedTiles.length){
    return true

  }
  const tail =  selectedTiles[selectedTiles.length-1]
  const ADJACENT_COL_TAIL = (tail.x+1 === value.x || tail.x-1 === value.x)
  const LONG_NEAR_ROW_TAIL = (tail.y === value.y || tail.y-1 === value.y)
  const SHORT_NEAR_ROW_TAIL = (tail.y === value.y || tail.y+1 === value.y) 
  const NEAR_ROW = LONG_COLUMN_INDEXES.includes(tail.x) ? LONG_NEAR_ROW_TAIL : SHORT_NEAR_ROW_TAIL
  const SAME_COL_TAIL = (tail.x === value.x &&  (tail.y-1 === value.y || tail.y+1 === value.y))
  const ADJACENT_TILE_TAIL = ADJACENT_COL_TAIL && NEAR_ROW
  return SAME_COL_TAIL || ADJACENT_TILE_TAIL
}
