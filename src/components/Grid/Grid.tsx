import { useMemo } from 'react';
import { SCALE } from '../../lib/const';
import styles from './Grid.module.scss';

export interface IGrid {
  width:number;
  rows: string[][] | null
}

function Column({ type }:{ type:string }) {
  return (
    <td className={styles[type]} />
  );
}

function Row({ row }:{ row:string[] }) {
  const ColumnComponent = useMemo(() => row.map((type) => <Column type={type} />), []);
  return (
    <tr className={styles.row} style={{ height: SCALE }}>{ColumnComponent}</tr>
  );
}

function Grid({ width = 0, rows }:IGrid) {
  if (!rows) return null;

  // eslint-disable-next-line react/no-array-index-key
  const rowsComponent = useMemo(() => rows.map((row, i) => <Row row={row} key={i} />), [rows]);

  return (
    <table className={styles.background} style={{ width: width * SCALE }}>{rowsComponent}</table>
  );
}
export default Grid;
