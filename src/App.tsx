import './App.css';
import Actors from './components/Actors/Actors';
import Grid from './components/Grid/Grid';
import UseInitializer from './UseInitializer';

function App() {
  const {
    width,
    rows,
    actors,
    gameStatus,
  } = UseInitializer();

  return (
    <div className={`game ${gameStatus}`}>
      <Actors actors={actors} />
      <Grid width={width} rows={rows} />
    </div>
  );
}

export default App;
