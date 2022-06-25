import { render } from '@testing-library/react';
import Actors from './Actors';

import props from './Actors.mock';

it('renders without crashing', () => {
  render(<Actors actors={props.base.rows} />);
});
