import { useEffect, useMemo, useState } from 'react';
import { simpleLevelPlan } from './lib/const';
import Level from './lib/Level';
import State from './lib/State';
import { StartActor, Status } from './lib/types';

type UseInitializerResult = {
  width: number;
  height: number;
  rows: string[][] | null;
  actors: Array<StartActor> | null;
  gameStatus: Status;
};

const UseInitializer = (): UseInitializerResult => {
  const [area, setArea] = useState({
    width: 0,
    height: 0,
  });

  const [rows, setRows] = useState<string[][] | null>(null);

  const [actors, setActors] = useState<StartActor[] | null>(null);
  const [status, setStatus] = useState<Status>(Status.playing);

  const simpleLevel = useMemo(() => new Level(simpleLevelPlan), [simpleLevelPlan]);

  useEffect(() => {
    const state = State.start(simpleLevel);

    setActors(state.actors);
    setRows(state.level.rows);
    setArea({ width: state.level.width, height: state.level.height });
    setStatus(state.status);
  }, [simpleLevel]);

  return {
    width: area.width,
    height: area.height,
    rows,
    actors,
    gameStatus: status,
  };
};

export default UseInitializer;
