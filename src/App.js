import Grid from './components/grid.js';
import { GameProvider } from './components/gameContext.js';
import GameDisplay from './components/gameDisplay.js';
import GameButtons from './components/gameButtons.js';
import 'bulma/css/bulma.min.css';
import './App.css';
// import 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/css/fontawesome.min.css';

function App() {
  return (
    <>
      <div className="hero is-fullheight is-black no-scroll">
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
              <div className="buttons is-centered p-6">
                <GameButtons />
              </div>
            </div>
          </GameProvider>
          <a href="https://github.com/anon-legion" target="_blank">
            <footer className="hero-foot is-clickable has-text-centered">
              <p className="is-size-5 has-text-grey-dark">Copyright © 2021 =GV=
                <span className="icon-text">
                  <span className="icon is-medium has-text-grey-dark">
                    <i className="fab fa-github is-size-4"></i>
                  </span>
                </span>
              </p>
            </footer>
          </a>
        </main>
      </div>
    </>
  );
}

export default App;
