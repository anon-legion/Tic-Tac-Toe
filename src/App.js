import Grid from './components/grid.js';
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
        <main className="hero-body is-flex is-justify-content-center">
          <div className="grid-container">
            <Grid />
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
