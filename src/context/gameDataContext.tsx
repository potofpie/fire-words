import { FC, useState, useContext, createContext } from "react";



interface GameDataContextProps {
  selected: any,
  score: any
  appendTile: Function,
  clearTitles: Function,
}


export const GameDataContext = createContext<GameDataContextProps| undefined >(undefined);
export const GameDataProvider:FC = ({ children }) => {
  const [selected, setSelected] = useState<any>([])!
  const [score, setScore] = useState<any>(100)!

  const appendTile = (value: any) => {
    console.log(value)
    setSelected( (prevState: any, props: any)  => ([ ...prevState, value]))

  } 
  const clearTitles = () => {
    setSelected([])
  } 

  return (
    <GameDataContext.Provider value={{ 
        selected, 
        score, 
        appendTile, 
        clearTitles
      }}>
      {children}
    </GameDataContext.Provider>
  );
};


export const useGameData = () => useContext(GameDataContext);