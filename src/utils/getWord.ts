import axios from "axios";
import {Word} from '../types'
export const getWord = async (word: string): Promise<Array<Word>> => {
    const { data } = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    return data;
  }