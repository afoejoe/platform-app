import { useRef } from 'react';
import './App.css';
import Actors from './components/Actors/Actors';
import Grid from './components/Grid/Grid';
import UseInitializer from './UseInitializer';

function App() {
  const gameWrapper = useRef<HTMLDivElement>(null);

  const { width, rows, actors, gameStatus } = UseInitializer(gameWrapper);

  return (
    <div className={`game ${gameStatus}`} ref={gameWrapper}>
      <Actors actors={actors} />
      <Grid width={width} rows={rows} />
    </div>
  );
}

export default App;
