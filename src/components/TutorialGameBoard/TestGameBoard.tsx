import {FC, useEffect, useMemo, useState }from 'react';
import {LetterTile} from '../LetterTile2';
import Fade from 'react-reveal/Fade';
import { useSpring } from "react-spring";
import {
  AiFillCloseCircle,
  AiFillCheckCircle 
} from 'react-icons/ai'
import { useTour } from '@reactour/tour'
import { useGameData } from '../../context/gameDataContext'
import { Modal } from '../Modal'
import { TUTORIAL_BOARD} from '../../constants/tutorialBoard'
import { EMPTY_BOARD } from '../../constants/emptyBoard';

import lodash from 'lodash';
import {
  Header, 
  Footer, 
  IconCheckButton, 
  IconCrossButton, 
  WordText, 
  StyledGameBoard, 
  AppHeader
} from '../../styled'
import probabilities from '../../output.json'  
import { Position, Character } from '../../types';



const  weightedRand2 = (probabilities: any)  => {
  var i, sum=0, r=Math.random();
  for (i in probabilities) {
    sum += probabilities[i].total;
    if (r <= sum) return i;
  }
}


const generateBoard = () => {
  console.log("weo")

  const [p1,p2,p3]  = lodash.range(3).map(() => {
    const x = lodash.random(4)
    const xIsEven = (x + 1) % 2 === 0
    const y = xIsEven ? lodash.random(6) : lodash.random(5);
    const letter = weightedRand2(probabilities) ?? ' '


    return {
      x,
      y,
      letter
    }
  })
  return [p1,p2,p3];



} 



export const TestGameBoard:FC = () => {
      const thing = useMemo(generateBoard,[])
      return (
      <>
                <div className='flex flex-row bg-red-500'>
                {console.log('=======')}
                {lodash.range(5).map((x) => {
                  const isOdd = (x + 1) % 2 ? true : false;
                  return (
                    <div className={`flex flex-col bg-blue-500 ml-2 ${isOdd ? 'mt-8' : 'mt-1'  }`}>
                      {x}
                      {lodash.range(isOdd ? 6 : 7 ).map((y) => {

                          const l = thing.filter((item) => item.x === x &&  item.y === y)
                          if(l.length){
                            console.log({l})
                          }
                          if(l.length > 0 && x === l[0].x  && y === l[0].y ) {
                            // console.log(l[0].letter)
                            return <div className='h-10 w-10 bg-purple-500 m-2 text-green-500'>
                              <div>{l[0].x},{l[0].y}</div> 
                              
                            <div>{l[0].letter} {console.log(l[0].letter)}</div>
                            </div>  
                          }

                          else {
                            return <div className='h-10 w-10 bg-purple-500 m-2'>
                              <div>{x},{y}</div> 
                            </div>  
                          }

                        } 
                      )}
                    </div>
                  ) 
                  }
                )  
                } 
                </div > 
      </>
      );
}

