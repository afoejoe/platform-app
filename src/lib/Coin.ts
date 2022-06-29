// eslint-disable-next-line import/no-cycle
import { wobbleDist, wobbleSpeed } from './const';
import State from './State';

// eslint-disable-next-line import/no-cycle
import { StartActor, Status } from './types';
import Vec from './Vec';

export interface ICoin {
  type: string;
  coin: string;
  size: Vec;
  pos: Vec;
  collide(state: State): State;
  update(time: number, state: State): ICoin;
}

class Coin implements ICoin {
  coin = 'coin';

  size = new Vec(0.6, 0.6);

  constructor(
    public pos: Vec,
    private basePos: Vec,
    private wobble = Math.random() * Math.PI * 2,
  ) {}

  collide(state: State): State {
    const filtered = state.actors.filter(
      (actor: any) => actor && actor !== this,
    );

    let { status } = state;

    if (!filtered.some((actor: StartActor) => actor.type === 'coin')) {
      status = Status.won;
    }

    return new State(state.level, filtered, status);
  }

  get type() {
    return this.coin;
  }

  static create(pos: Vec) {
    const basePos = pos.plus(new Vec(0.2, 0.1));

    return new Coin(pos, basePos);
  }

  update(time: number) {
    const wobble = this.wobble + time * wobbleSpeed;
    const wobblePos = Math.sin(wobble) * wobbleDist;
    return new Coin(
      this.basePos.plus(new Vec(0, wobblePos)),
      this.basePos,
      wobble,
    );
  }
}

Coin.prototype.size = new Vec(0.6, 0.6);

export default Coin;

export type TCoin = typeof Coin;
