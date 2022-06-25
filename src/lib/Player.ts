import Vec from './Vec';

export interface IPlayer {
  type: string;
  player: string;
  pos: Vec;
  size: Vec;
}

class Player implements IPlayer {
  player = 'player';

  constructor(public pos: Vec, private speed: any) {}

  size = new Vec(0.8, 1.5);

  get type() {
    return this.player;
  }

  static create(pos: any) {
    return new Player(pos.plus(new Vec(0, -0.5)), new Vec(0, 0));
  }

  // static size = new Vec(0.8, 1.5);
}

// Player.prototype.size = new Vec(0.8, 1.5);

export default Player;

export type TPlayer = typeof Player;
