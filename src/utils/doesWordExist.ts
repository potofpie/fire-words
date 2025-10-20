import { WordValidationState } from "../types";

let wordsDict: Record<string, boolean> | null = null;

const loadDictionary = async (): Promise<Record<string, boolean>> => {
  if (wordsDict) return wordsDict;
  
  const response = await fetch('/words.json');
  wordsDict = await response.json();
  return wordsDict as Record<string, boolean>;
}

const loopUpWord = async (word: string): Promise<Boolean> => {
    const dict = await loadDictionary();
    const lookup = word.toLowerCase();
    const exists = dict[lookup] === true;
    console.log('Looking up word:', word, '-> normalized:', lookup, '-> exists:', exists);
    return exists;
  }

export const validateWord = async (
  word: string, 
  setWordValidationState: Function, 
  flippedSelectedTiles: Function, 
  bumpScore: Function, 
  clearTile: Function
  ) => {

  console.log("Validating word:", word);
  const wordExists = await loopUpWord(word)
  console.log("Word exists:", wordExists);
  wordExists ? setWordValidationState('success') : setWordValidationState('error')

  setTimeout( () => {
    setWordValidationState( (prevState: WordValidationState, props: any) => { 

      if(prevState === 'success'){
        bumpScore()
        flippedSelectedTiles()
      }
      return 'idle' 
    })
    clearTile();
  }, 500);

}