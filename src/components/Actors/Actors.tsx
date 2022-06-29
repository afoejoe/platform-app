import { useMemo } from 'react';
import { SCALE } from '../../lib/const';
import { StartActor } from '../../lib/types';
import styles from './Actors.module.scss';

export interface IActors {
  actors: StartActor[] | null;
}

function Actor({ actor }: { actor: StartActor }) {
  const { type, size, pos } = actor;
  return (
    <div
      className={`${type} ${styles[type]} ${styles.actor}`}
      style={{
        width: size.x * SCALE,
        height: size.y * SCALE,
        left: pos.x * SCALE,
        top: pos.y * SCALE,
      }}
    />
  );
}

function Actors({ actors }: IActors) {
  const ActorComponent = useMemo(
    () =>
      // eslint-disable-next-line react/no-array-index-key
      actors?.filter((item) => item).map((a, i) => <Actor actor={a} key={i} />),
    [actors],
  );

  return <div className="">{ActorComponent}</div>;
}
export default Actors;
