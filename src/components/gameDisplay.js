// react fcuntion component to display game status

import React, { useState, useEffect } from 'react';
import { useGameContext } from './gameContext';
import 'bulma/css/bulma.min.css';
import '../App.css';


export default function GameDisplay() {
  const { turn, winner, turnCount, config, toggleConfig } = useGameContext();

  const [playerStatus, setPlayerStatus] = useState(() => {
    return {
      X: '',
      O: '',
    }
  });


  useEffect(() => {
    // function checks if there is already a winner
    // returns true if winner array is not empty, false otherwise
    const isGameOver = () => {
      return winner.length ? true : false;
    }
    if (turnCount.current >= 9 && !isGameOver()) {
      // if moves have been exhausted and now winner game is draw
      setPlayerStatus(prevState => {
        return {
          X: 'DRAW',
          O: 'DRAW'
        }
      })
    } else {
      // do if moves have not been exhausted
      switch (turn) {
        case 1:
          setPlayerStatus(prevState => {
            return {
              X: isGameOver() ? 'WIN!' : 'Turn',
              O: isGameOver() ? 'LOSE!' : null,
            }
          });
          break;
        case -1:
          setPlayerStatus(prevState => {
            return {
              X: isGameOver() ? 'LOSE!' : null,
              O: isGameOver() ? 'WIN!' : 'Turn',
            }
          });
          break;
        default:
          setPlayerStatus(prevState => {
            return {
              X: '(double click to toggle AI)',
              O: '(double click to toggle AI)',
            }
          });
      }
    }
  },[turn, winner, turnCount]);

  // function to toggle AI on double click used by div box
  const handleDoubleClick = (e) => {
    toggleConfig(e.currentTarget.id);
  };
        

  return (
    <>
      <div className="columns is-variable is-1 is-mobile">
        <div className="column is-half">
          <div className="section p-0 pl-3 min-height-1">
            {/* hide playerStatus if game is not in playing state (turn === 0) */}
            <h4 className="is-size-5 has-text-link">{playerStatus.X}</h4>
          </div>
          <div className={`box p-3 player-x ${winner.length && turn > 0 ? 'is-win' : null}`} id="X" onDoubleClick={handleDoubleClick}>
            <h4 className="is-size-5 has-text-white">{config.X.label}</h4>
          </div>
        </div>
        <div className="column is-half">
          <div className="section p-0 pr-3 has-text-right min-height-1">
            {/* hide playerStatus if game is not in playing state (turn === 0) */}
            <h4 className="is-size-5 has-text-link">{playerStatus.O}</h4>
          </div>
          <div className={`box p-3 has-text-right player-o ${winner.length && turn < 0 ? 'is-win' : null}`} id="O" onDoubleClick={handleDoubleClick}>
            <h4 className="is-size-5 has-text-white">{config.O.label}</h4>
          </div>
        </div>
      </div>
    </>
  )

}