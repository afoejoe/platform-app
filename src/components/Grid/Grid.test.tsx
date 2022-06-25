import { render } from '@testing-library/react';
import Grid from './Grid';

import props from './Grid.mock';

it('renders without crashing', () => {
  render(<Grid rows={props.base.rows} width={props.base.width} />);
});
