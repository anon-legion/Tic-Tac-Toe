// react function component for the square]

import React from "react";
import 'bulma/css/bulma.min.css';
import '../App.css';

export default function Square({ rowIndex, squareIndex, value }) {
  return (
    <div className="square" rowIndex={rowIndex} squareIndex={squareIndex} value={value} >
      {value}
    </div>
  );
}