import axios from "axios";
import {DICTIONARY_API} from "../constants";
import { WordValidationState } from "../types";


const validateStatus = (status: number) =>  status === 200 || status === 404

const loopUpWord = async (word: string): Promise<Boolean> => {
    const { status } = await axios.get(
      `${DICTIONARY_API}${word}`,
      {
        validateStatus
      }
    );
    return status === 200;
  }

export const validateWord = async (
  word: string, 
  setWordValidationState: Function, 
  flippedSelectedTiles: Function, 
  bumpScore: Function, 
  clearTile: Function
  ) => {

  // console.log("wordExists")
  const wordExists = await loopUpWord(word)
  // console.log(wordExists)
  wordExists ? setWordValidationState('success') : setWordValidationState('error')
  // console.log(wordExists)

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