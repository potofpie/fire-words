
import { Position } from "../types"
export const  isTileSelected = ({pos, selected}: {pos: Position, selected: any} ) => 
    selected?.filter((selectedPos: Position) => selectedPos.x === pos.x && selectedPos.y === pos.y)?.length === 1
