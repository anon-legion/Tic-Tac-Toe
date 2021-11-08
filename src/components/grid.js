// react function component that renders a 3 by 3 grid of squares

import React, { useState } from 'react';
import Square from './square.js';
import 'bulma/css/bulma.min.css';


export default function Grid() {
	const [gridArray, setGridArray] = useState(() => [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	]);

	
  return (
    <>
      {gridArray.map((row, rowIndex) => {
        return (
          row.map((square, squareIndex) => {
            return (
              <Square
              key={squareIndex}
              value={square}
              rowIndex={rowIndex}
              squareIndex={squareIndex}
              />
            );
          })
        );
        // return (
          // <div key={rowIndex}>
          //   {row.map((square, colIndex) => {
          //     return (
          //       <Square
          //         key={colIndex}
          //         id={`${rowIndex}-${colIndex}`}
          //         value={square}
          //       />
          //     );
          //   })}
          // </div>
        // );
      })}
    </>
  );
}