// eslint-disable-next-line import/no-cycle
import Coin from './Coin';
import Lava from './Lava';
// eslint-disable-next-line import/no-cycle
import Player from './Player';
import { LevelChar, ValidCharConfig } from './types';

const levelChars: LevelChar = {
  [ValidCharConfig.empty]: 'empty',
  [ValidCharConfig.wall]: 'wall',
  [ValidCharConfig.lavaString]: 'lava',
  [ValidCharConfig.player]: Player,
  [ValidCharConfig.lavaHorizontal]: Lava,
  [ValidCharConfig.lavaVertical]: Lava,
  [ValidCharConfig.lavaDropping]: Lava,
  [ValidCharConfig.coin]: Coin,
};

export const SCALE = 20;

export default levelChars;

export const wobbleSpeed = 8;
export const wobbleDist = 0.07;
export const playerXSpeed = 7;
export const gravity = 30;
export const jumpSpeed = 17;
export const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp'];
