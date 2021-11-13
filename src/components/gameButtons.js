// react function component for the game buttons

import React from 'react';
import { useGameContext } from './gameContext';


export default function GameButtons() {
	const { resetGame } = useGameContext();
	return (
		<>
			<button className="button is-link is-outlined" onClick={resetGame}>
				<span className="is-size-5">Reset</span>
			</button>
		</>
  );
}