import { FC, PropsWithChildren, useState, useContext, createContext, useReducer } from "react";
import { GameboardState, } from '../../utils/gameboard/types' 
import { EMPTY_BOARD } from '../../constants'
import { reducer, GameboardActions } from "./actions"; 


export interface GameDataContextProps {
  gameBoardState: GameboardState,
  dispatchGameboardAction: React.Dispatch<GameboardActions>
}


export const GameboardContext = createContext<GameDataContextProps| undefined >(undefined);
export const GameboardContextProvider:FC<PropsWithChildren> = ({ children }) => {
  const initialState: GameboardState  = {
      gameboard: EMPTY_BOARD,
      selected: []
    }
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