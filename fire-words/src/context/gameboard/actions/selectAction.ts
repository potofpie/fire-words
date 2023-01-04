
import { TileData,  GameboardState } from '../../../utils/gameboard/types'

type SelectActionKindString = 'SELECT'
export const SelectActionKind: SelectActionKindString  = 'SELECT'

export interface SelectAction {
  type:  SelectActionKindString;
  payload: TileData
}


export const select = (tile: TileData, gameboardState: GameboardState ) => {
 const newGameboardState = {...gameboardState}
 const {x, y, letter, selected } = tile
 const selectedTiles = newGameboardState.selected;
 newGameboardState.selected = [...selectedTiles, tile]
 newGameboardState.gameboard.columns[x].tiles[y].selected = true
 return newGameboardState

}
