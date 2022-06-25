import { render } from '@testing-library/react';

import { BaseTemplate } from './BaseTemplate';
import props from './BaseTemplate.mock';

it('renders without crashing', () => {
  render(<BaseTemplate sampleTextProp={props.base.sampleTextProp} />);
});
