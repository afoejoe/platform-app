import Vec from './Vec';

export interface ICoin {
  type: string;
  coin: string;
  size: Vec;
  pos: Vec;
}

class Coin implements ICoin {
  coin = 'coin';

  size = new Vec(0.6, 0.6);

  constructor(
    public pos: any,
    private basePos: any,
    private wobble = Math.random() * Math.PI * 2,
  ) {}

  get type() {
    return this.coin;
  }

  static create(pos: any) {
    const basePos = pos.plus(new Vec(0.2, 0.1));

    return new Coin(pos, basePos);
  }
}

Coin.prototype.size = new Vec(0.6, 0.6);

export default Coin;

export type TCoin = typeof Coin;
