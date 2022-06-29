import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import PLANS from './data';
import { keys } from './lib/const';
import Level from './lib/Level';
import State from './lib/State';
import { StartActor, Status } from './lib/types';
import { scrollPlayerIntoView } from './lib/utils';

type UseInitializerResult = {
  width: number;
  height: number;
  rows: string[][] | null;
  actors: Array<StartActor> | null;
  gameStatus: Status;
};

const UseInitializer = (
  gameRef: RefObject<HTMLDivElement>,
): UseInitializerResult => {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const [area, setArea] = useState({
    width: 0,
    height: 0,
  });

  const [rows, setRows] = useState<string[][] | null>(null);

  const [actors, setActors] = useState<StartActor[] | null>(null);
  const [status, setStatus] = useState<Status>(Status.playing);
  const [level, setLevel] = useState<number>(0);

  const [state, setState] = useState<State>(
    State.start(new Level(PLANS[level])),
  );
  const [down, setDown] = useState<Record<string, boolean>>({
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
  });

  useEffect(() => {
    setState(State.start(new Level(PLANS[level])));
    return () => {};
  }, [level]);

  const track = useCallback((event: any) => {
    if (keys.includes(event.key)) {
      setDown((prev) => ({
        ...prev,
        [event.key]: event.type === 'keydown',
      }));

      event.preventDefault();
    }
  }, []);

  useEffect(() => {
    setState(State.start(new Level(PLANS[level])));
  }, [level]);

  useEffect(() => {
    window.addEventListener('keydown', track);
    window.addEventListener('keyup', track);

    return () => {
      window.removeEventListener('keydown', track);
      window.removeEventListener('keyup', track);
    };
  }, [track]);

  const animateFnc = useCallback(
    (time: number) => {
      const lastTime = previousTimeRef.current;

      const frameFunc = (
        timeStep: number,
        stateArg: State,
        downArg: Record<string, boolean>,
      ) => {
        const newState = stateArg.update(timeStep, downArg);
        setState(newState);

        if (newState.status === Status.playing) {
          return true;
        }
        return false;
      };

      if (lastTime != null) {
        const timeStep = Math.min(time - lastTime, 100) / 1000;
        if (frameFunc(timeStep, state, down) === false) {
          requestRef.current = undefined;
          previousTimeRef.current = undefined;
          return;
        }
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animateFnc);
    },
    [down, state],
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateFnc);

    return () => cancelAnimationFrame(requestRef.current || 0);
  }, [animateFnc, down]);

  useEffect(() => {
    if (!state) return;
    setActors(state.actors);
    setRows(state.level.rows);
    setArea({ width: state.level.width, height: state.level.height });
    setStatus(state.status);
    scrollPlayerIntoView(state, gameRef);
  }, [gameRef, state]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (status === Status.won) {
        setLevel((prevLevel) => (prevLevel + 1) % PLANS.length);
      }
      if (status === Status.lost) {
        setState(State.start(new Level(PLANS[level])));
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [level, status]);

  return {
    width: area.width,
    height: area.height,
    rows,
    actors,
    gameStatus: status,
  };
};

export default UseInitializer;
