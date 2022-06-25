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
}

export default Level;

export type TLevel = typeof Level;
