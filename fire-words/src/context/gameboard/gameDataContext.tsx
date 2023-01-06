import { FC, PropsWithChildren, useMemo, useContext, createContext, useReducer } from "react";
import { GameboardState, } from '../../utils/gameboard/types' 
import { EMPTY_BOARD } from '../../constants'
import { reducer, GameboardActions } from "./actions"; 
import { generateBoard } from "../../utils/gameboard/generateBoard"; 


export interface GameDataContextProps {
  gameBoardState: GameboardState,
  dispatchGameboardAction: React.Dispatch<GameboardActions>
}


export const GameboardContext = createContext<GameDataContextProps| undefined >(undefined);
export const GameboardContextProvider:FC<PropsWithChildren> = ({ children }) => {
  const initialState: GameboardState  = {
      gameboard: generateBoard(),
      selected: []
    }
  console.log({initialState})
  const [gameBoardState, dispatchGameboardAction] = useReducer(reducer,initialState)

  return (
    <GameboardContext.Provider value={{
      gameBoardState,
      dispatchGameboardAction

    }}>
      {children}
    </GameboardContext.Provider>
  );
};


export const useGameboard = () => useContext(GameboardContext);