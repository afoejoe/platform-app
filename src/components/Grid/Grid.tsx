import { memo, useMemo } from 'react';
import { SCALE } from '../../lib/const';
import styles from './Grid.module.scss';

export interface IGrid {
  width: number;
  rows: string[][] | null;
}

function Column({ type }: { type: string }) {
  return <td className={styles[type]} />;
}

function Row({ row }: { row: string[] }) {
  const ColumnComponent = useMemo(
    // eslint-disable-next-line react/no-array-index-key
    () => row.map((type, i) => <Column type={type} key={i} />),
    [row],
  );
  return (
    <tr className={styles.row} style={{ height: SCALE }}>
      {ColumnComponent}
    </tr>
  );
}

function Grid({ width = 0, rows }: IGrid) {
  const rowsComponent = useMemo(
    // eslint-disable-next-line react/no-array-index-key
    () => rows?.map((row, i) => <Row row={row} key={i} />),
    [rows],
  );

  return (
    <table className={styles.background} style={{ width: width * SCALE }}>
      <tbody>{rowsComponent}</tbody>
    </table>
  );
}
export default memo(Grid);
