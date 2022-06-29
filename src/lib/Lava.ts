import State from './State';
// eslint-disable-next-line import/no-cycle
import { Status, ValidCharConfig } from './types';
import Vec from './Vec';

export interface ILava {
  type: string;
  lava: string;
  size: Vec;
  pos: Vec;
  collide(state: State): State;
  update(time: number, state: State): Lava;
}

class Lava {
  lava = 'lava';

  size = new Vec(1, 1);

  constructor(public pos: Vec, private speed: Vec, private reset?: Vec) {
    this.pos = pos;
    this.speed = speed;
    this.reset = reset;
  }

  get type() {
    return this.lava;
  }

  static create(
    pos: Vec,
    ch: Omit<ValidCharConfig, 'player' | 'wall' | 'empty' | 'coin'>,
  ) {
    switch (ch) {
      case ValidCharConfig.lavaHorizontal:
        return new Lava(pos, new Vec(2, 0));
      case ValidCharConfig.lavaVertical:
        return new Lava(pos, new Vec(0, 2));
      case ValidCharConfig.lavaDropping:
        return new Lava(pos, new Vec(0, 3), pos);
      default:
        return null;
    }
  }

  collide(state: State) {
    console.log(this);

    return new State(state.level, state.actors, Status.lost);
  }

  update(time: number, state: State) {
    const newPos = this.pos.plus(this.speed.times(time));
    if (!state.level.touches(newPos, this.size, 'wall')) {
      return new Lava(newPos, this.speed, this.reset);
    }
    if (this.reset) {
      return new Lava(this.reset, this.speed, this.reset);
    }
    return new Lava(this.pos, this.speed.times(-1));
  }
}

Lava.prototype.size = new Vec(1, 1);

export default Lava;
export type TLava = typeof Lava;
