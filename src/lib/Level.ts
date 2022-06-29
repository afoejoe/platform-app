import levelChars from './const';
import { StartActor } from './types';
import Vec from './Vec';

class Level {
  height;

  width;

  startActors: Array<StartActor | null>;

  rows;

  constructor(plan: string) {
    const tempRows = plan
      .trim()
      .split('\n')
      .map((l) => [...l]);

    this.height = tempRows.length;
    this.width = tempRows[0].length;
    this.startActors = [];
    this.rows = tempRows.map(
      (row, y) =>
        row.map((ch, x) => {
          const type = levelChars[ch as keyof typeof levelChars];
          if (typeof type === 'string') return type;
          this.startActors.push(type.create(new Vec(x, y), ch));
          return 'empty';
        }),
      // eslint-disable-next-line function-paren-newline
    );
  }

  touches(pos = { x: 0, y: 0 }, size = { x: 0, y: 0 }, type = '') {
    const xStart = Math.floor(pos.x);
    const xEnd = Math.ceil(pos.x + size.x);
    const yStart = Math.floor(pos.y);
    const yEnd = Math.ceil(pos.y + size.y);

    for (let y = yStart; y < yEnd; y++) {
      for (let x = xStart; x < xEnd; x++) {
        const isOutside = x < 0 || x >= this.width || y < 0 || y >= this.height;
        const here = isOutside ? 'wall' : this.rows[y][x];
        if (here === type) return true;
      }
    }
    return false;
  }
}

export default Level;

export type TLevel = typeof Level;
