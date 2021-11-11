import Grid from './components/grid.js';
import { GameProvider } from './components/gameContext.js';
import GameDisplay from './components/gameDisplay.js';
import 'bulma/css/bulma.min.css';
import './App.css';

function App() {
  return (
    <>
      <div className="hero is-fullheight is-black">
        <header className="hero-head">
          <div className="container has-text-centered">
            <h1 className="title is-1 has-text-primary">Tic Tac Toe</h1>
            <h2 className="subtitle is-3">Minimax algorithm</h2>
          </div>
        </header>
        <main className="hero-body is-flex is-flex-direction-column is-justify-content-center mobile-LR-nopadding">
          <GameProvider>
            <div className="container">
              <div className="section p-0 pb-3">
                <GameDisplay />
              </div>
              <div className="grid-container">
                <Grid />
              </div>
            </div>
          </GameProvider>
        </main>
      </div>
    </>
  );
}

export default App;
