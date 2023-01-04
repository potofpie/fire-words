import { FC, useEffect, useRef, useState }from 'react';
import { TileData } from '../../../utils/gameboard/types'
import { motion, useAnimationControls } from "framer-motion"
import { ERROR, DEFAULT, SELECTED_BORDER, TEMPERATURE_COLORS } from '../../../constants';
import smoke from '../../../assets/smoke5.png'

interface LetterTileProps {
  value: TileData
  hasTimer?: boolean
  onClick?: (tile: TileData) => void
}



function getRandomInt(max:number) {
  return Math.floor(Math.random() * max);
}

function randomNumber(min:number, max:number) { 
  return Math.random() * (max - min) + min;
} 


export const LetterTile:FC<LetterTileProps> = ({value, hasTimer = true, onClick }) => {
  const { x, y , letter, error, selected } = value;
  // const [selected, setSelected] = useState<boolean>(false)
  const controls = useAnimationControls()
  const imgControls = useAnimationControls()
  const leftVariation = 10

  const [heat, setHeat] = useState<number>(0)

  const createHeatUpInterval = () => setInterval( () => 
    {
      const rotation = randomNumber(200,320)
      const rotateTo = randomNumber(-15,15)
      if(Math.random() > .95){
        setHeat((prevHeat) => prevHeat + 1);
        imgControls.set({x: 0, y: 0, opacity: 0, rotateZ: rotation, scale: 1.3})
        imgControls.start({
          y: [1,-25 ], 
          x: [getRandomInt(leftVariation),0,-getRandomInt(leftVariation),0,getRandomInt(leftVariation)], 
          scale: [1,1.5,.5], 
          skewX: [0,getRandomInt(20),0], 
          skewY: [0,getRandomInt(20),0],  
          opacity: [0,.5,0] ,  
          rotateZ: rotation+rotateTo,
          transition: { duration: 2.5 }})
      } 
    },
    3.5 * 1000
  )




  // heat up animation
  useEffect(() => {
    if(heat){
      controls.start({ backgroundColor: [ TEMPERATURE_COLORS[heat-1] ,TEMPERATURE_COLORS[heat]], x: [0,-1,1,-1,1,-1,1,-1,1,0], y: [0,-1,1,-1,1,-1,1,-1,1,0],  transition: { duration: .6 }})
    }
    else {
      controls.set({ backgroundColor: TEMPERATURE_COLORS[0]})
    }
  },[heat])


  // loading in tiles animation
  useEffect(() => {
    controls.set({ opacity: 0, scale: .1})
    controls.start(i => ({scale: 1, opacity: 1,  transition: { duration: 1, delay: i * 0.1 }}))  
  },[])


  useEffect(() => {
    if(selected){ 
      controls.start({ borderWidth: 3, borderColor: SELECTED_BORDER,  transition: { duration: .3 }})
    }
    else{
        controls.start({ borderWidth: 0, borderColor: SELECTED_BORDER,  transition: { duration: .3 }})
    }
  },[selected])


  useEffect(() => {
    if(false){
      controls.start({ backgroundColor: [ DEFAULT ,ERROR, DEFAULT,], x: [0,-6,6,-3,3,0],  transition: { duration: .6 }})
    }
  },[error])


  useEffect(() => {
    imgControls.set({x: 0, y: 0, opacity: 0})
    const id = hasTimer ? createHeatUpInterval() : 1 //dummy id for interval
  },[])


  return (
        <motion.div
          custom={y}
          
          className='h-14 w-14 bg-[#f2f0e6] m-1 shadow-lg text-2xl font-semibold flex justify-center rounded-lg items-center'
          animate={controls}
          onClick={() => onClick?.(value)} 
          key={`${x},${y}`}
          > 
          <motion.img animate={imgControls} className='absolute w-8 h-8' src={smoke} style={{filter: 'invert(0.30)'}} />
            <div>{letter}</div> 
        </motion.div>
  )

}