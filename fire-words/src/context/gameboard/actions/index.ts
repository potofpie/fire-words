import { GameboardState } from '../../../utils/gameboard/types';
import { SelectAction, SelectActionKind, select } from './selectAction'
import { ResetBoardAction, ResetBoardActionKind } from './resetBoardAction'
import { SubmitSelectedActionKind, SubmitSelectedAction   } from './submitSelectedAction'

export const GameboardActionKind =  {
    SELECT: SelectActionKind,
    RESET_BOARD: ResetBoardActionKind,
    SUBMIT_SELECTED: SubmitSelectedActionKind
}


type NoPayloadGameboardActions = ResetBoardAction | SubmitSelectedAction
export type GameboardActions =  SelectAction | NoPayloadGameboardActions


export const reducer = (state: GameboardState, action: GameboardActions) => {
  const { type }  = action;
  switch (type) {
    case GameboardActionKind.SELECT:
      const { payload } = action
      return { ...select(payload, state)};
    default:
      return state;
  }
}