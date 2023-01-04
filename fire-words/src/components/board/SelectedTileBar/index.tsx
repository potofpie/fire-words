import { motion, useAnimationControls } from 'framer-motion';
import { FC, useEffect,  useState }from 'react';
import { useGameboard } from '../../../context/gameboard/gameDataContext';





export const SelectedTileBar:FC = () => {
  const controls = useAnimationControls()
  const { gameBoardState } = useGameboard()!;

  useEffect(() => {
    controls.set({ opacity: 0, scale: .1})
    if(gameBoardState.selected.length){
      controls.start(i => ({scale: 1, opacity: 1,  transition: { duration: 1, delay: i * 0.1 }}))  
    }
  },[gameBoardState.selected.length === 0])




  return (
        <motion.div
          animate={controls}
          className='h-14 h-14 bg-red-500'
          > 

        </motion.div>
  )

}