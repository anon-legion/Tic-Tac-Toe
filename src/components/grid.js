// react function component that renders a 3 by 3 grid of squares

import React, { useState } from 'react';
import imgX from '../img/ttt_x.png';
import imgO from '../img/ttt_o.png';
import 'bulma/css/bulma.min.css';
import '../App.css';

const imgSelector = (n) => {
  if (n > 0) {
    return imgX;
  } else if (n < 0) {
    return imgO;
  } else {
    return null;
  }
}


export default function Grid() {
	const [gridArray, setGridArray] = useState(() => [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	]);

  const [turn, setTurn] = useState(() => 1);


  const flipTurn = () => {
    setTurn(prevTurn => prevTurn * -1);
  }

  const handleClick = (row, col) => {
    if (gridArray[row][col] !== 0) {
      return;
    } else {
      const newGridArray = [...gridArray];
      newGridArray[row][col] = turn;
      setGridArray(prevState => [...newGridArray]);
      flipTurn();
    }
  }
	
  return (
    <>
      {gridArray.map((row, yAxis) => {
        return (
          row.map((col, xAxis) => {
            return (              
              <div
                key={`${yAxis}${xAxis}`}
                className={`square-${yAxis}${xAxis}`}
                value={gridArray[yAxis][xAxis]}
                onClick={() => handleClick(yAxis, xAxis)}
              >
                <img src={imgSelector(gridArray[yAxis][xAxis])} alt={gridArray[yAxis][xAxis] === 0 ? '' : "X or O"} />
              </div>
            );
          })
        );
      })}
    </>
  );
}