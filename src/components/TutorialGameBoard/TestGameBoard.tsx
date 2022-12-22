import {FC }from 'react';
import {TutorialLetterTile} from '../TutorialLetterTile';
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



const  weightedRand2 = (probabilities: any)  => {
  var i, sum=0, r=Math.random();
  for (i in probabilities) {
    sum += probabilities[i].total;
    if (r <= sum) return i;
  }
}


const  generateBoard = () => {
  const [p1,p2,p3]  = lodash.range(3).map(() => {
    const x = lodash.random(7)
    const xIsEven = (x + 1) % 2 === 0
    const y = xIsEven ? lodash.random(8) : lodash.random(7) ;
    return {
      y,
      x,
      letter: weightedRand2(probabilities)

    }
  })
  return [p1,p2,p3];



} 


export const TestGameBoard:FC = () => {

    const b =generateBoard() 
    console.log(b)


    const { setIsOpen } = useTour();
    setIsOpen(true)

    const  { selected, selectedWord, score, clearTile, checkWordLength  } = useGameData()!
    const fade = useSpring( 
      {
        opacity:  selected.length ? 1 : 0
      } 
    )


    return (
    <>

        <Fade top>
          <AppHeader style={{justifyContent:'center'}} >Fire Words </AppHeader>
          </Fade>

          <Header >
            {selected.length ?  
              <WordText data-tut={"selected_word"} style={fade}>
                <IconCheckButton onClick={() => checkWordLength()} ><AiFillCheckCircle/></IconCheckButton>

                {selectedWord}
                
                <IconCrossButton onClick={() => clearTile() } ><AiFillCloseCircle/></IconCrossButton>
              </WordText>  :  <div style={{margin: 10,height: 33.5}}/>    }
          </Header>
          <Modal />

          <StyledGameBoard key='test' >
            <Fade >  
              {EMPTY_BOARD?.columns?.map( 
                (col: any, cindex: number) =>
                <div style={{  marginTop: TUTORIAL_BOARD?.columns?.length % 2 === 0 ? 25 : 0}} >
                    {col.points.map((point: any, pindex: number) => {
                        const p = b.filter(e => 
                            e.x  === point.x && e.y === point.y
                          )
                        return <TutorialLetterTile  pos={p.length ? p[0] : point } />
                    }
                    ) }
                  </div>  
              )  } 
          </Fade>
          </StyledGameBoard> 
            <Footer>
              <Fade>
                <div> {score} </div>
              </Fade>
            </Footer>
    </>
    );
}

