import Vec from './Vec';

export interface ILava {
  type: string;
  lava: string;
  size: Vec;
  pos: Vec;
}

class Lava {
  lava = 'lava';

  size: any;

  constructor(public pos: any, private speed: any, private reset?: any) {
    this.pos = pos;
    this.speed = speed;
    this.reset = reset;
  }

  get type() {
    return this.lava;
  }

  static create(pos: any, ch: any) {
    if (ch === '=') {
      return new Lava(pos, new Vec(2, 0));
    }
    if (ch === '|') {
      return new Lava(pos, new Vec(0, 2));
    }
    return null;
  }
}

Lava.prototype.size = new Vec(1, 1);
export default Lava;
export type TLava = typeof Lava;
