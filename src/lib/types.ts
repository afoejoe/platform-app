import { ICoin, TCoin } from './Coin';
import { ILava, TLava } from './Lava';
import { IPlayer, TPlayer } from './Player';

export type TVector = {
  x: number;
  y: number;
};

export enum Status {
  playing = 'playing',
  lost = 'lost',
  won = 'won',
}

export type StartActor = IPlayer | ILava | ICoin;

export type Actor = TPlayer | TLava | TCoin;

export enum ValidCharConfig {
  player = '@',
  wall = '#',
  lavaHorizontal = '=',
  empty = '.',
  lavaString = '+',
  lavaVertical = '|',
  lavaDropping = 'v',
  coin = 'o',
}
export type LavaChar = Omit<
  ValidCharConfig,
  'player' | 'wall' | 'empty' | 'coin'
>;

export type LevelChar = Record<
  ValidCharConfig,
  Actor | 'empty' | 'lava' | 'wall'
>;
