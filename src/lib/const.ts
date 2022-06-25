import Coin from './Coin';
import Lava from './Lava';
import Player from './Player';
import { LevelChar, ValidCharConfig } from './types';

const levelChars: LevelChar = {
  [ValidCharConfig.empty]: 'empty',
  [ValidCharConfig.wall]: 'wall',
  [ValidCharConfig.lavalString]: 'lava',
  [ValidCharConfig.player]: Player,
  [ValidCharConfig.lavaHorizontal]: Lava,
  [ValidCharConfig.lavaVertical]: Lava,
  [ValidCharConfig.lavaDropping]: Lava,
  [ValidCharConfig.coin]: Coin,
};

export const simpleLevelPlan = `
......................
..#................#..
..#..............=.#..
..#.........o.o....#..
..#.@......#####...#..
..#####............#..
......#++++++++++++#..
......##############..
......................`;

export const SCALE = 20;

export default levelChars;
