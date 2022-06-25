import { useMemo } from 'react';
import { SCALE } from '../../lib/const';
import { StartActor } from '../../lib/types';
import styles from './Actors.module.scss';

export interface IActors {
  actors:StartActor[] | null;
}

function Actor({ actor }:{ actor:StartActor }) {
  const { type, size, pos } = actor;
  return (
    <div
      className={`${styles[type]} ${styles.actor}`}
      style={{
        width: size.x * SCALE,
        height: size.y * SCALE,
        left: pos.x * SCALE,
        top: pos.y * SCALE,
      }}
    />
  );
}

function Actors({ actors }:IActors) {
  if (!actors) return null;
  // eslint-disable-next-line react/no-array-index-key, max-len
  const ActorComponent = useMemo(() => actors.filter((item) => item).map((a, i) => <Actor actor={a} key={i} />), [actors]);

  return (
    <div className="">{ActorComponent}</div>
  );
}
export default Actors;
