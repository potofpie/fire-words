import {FC }from 'react';
import { AnimatedSquare } from '../../styled';
import Flash from 'react-reveal/Flash';
import { Link } from "react-router-dom";
import Fade from 'react-reveal/Fade';



export const StartScreen:FC = () => {
    return (

        <Link 
            style={{display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center'}} 
            to={ localStorage.getItem('tutorial') ? '/game' : '/tutorial'}> 
        <Fade>
        <div style={{display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center'}}> 
            <div style={{display: 'flex', flexDirection: 'row',  justifyContent: 'center'}}>
                <AnimatedSquare>F</AnimatedSquare> 
                <AnimatedSquare>I</AnimatedSquare>
                <AnimatedSquare>R</AnimatedSquare>
                <AnimatedSquare>E</AnimatedSquare>   
            </div>
            <div style={{display: 'flex', flexDirection: 'row',  justifyContent: 'center'}}>

                <AnimatedSquare>W</AnimatedSquare> 
                <AnimatedSquare>O</AnimatedSquare>
                <AnimatedSquare>R</AnimatedSquare>
                <AnimatedSquare>D</AnimatedSquare>   
                <AnimatedSquare>S</AnimatedSquare>   
            </div>
        <Flash forever={true}> 
          <h1 className='m-5' >tap to start!</h1>
        </Flash>              
      </div>
      </Fade>
      </Link>
        

    )

}
