import React, {FC}  from 'react';
import { useGameboard } from '../../context/gameboard/gameDataContext';

import { LetterTile } from '../../components/board/LetterTile'
import { GameboardActionKind } from '../../context/gameboard/actions';

const GameboardPage:FC = () =>  {
  const { gameBoardState, dispatchGameboardAction  } = useGameboard()!
  const { gameboard } = gameBoardState

  return (
    <div className='flex flex-row justify-center items-center flex-1'>
      {gameboard.columns.map((c, index) => <div className={`flex flex-col ${(index+1)%2 ? 'mt-4' : ''}`}>
        {c.tiles.map((t) => <LetterTile value={t} onClick={() => dispatchGameboardAction({type: GameboardActionKind.SELECT, payload: t })}/>)}
      </div>

      )}
    </div>
  );
}

export default GameboardPage;