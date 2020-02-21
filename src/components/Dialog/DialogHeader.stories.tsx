import { storiesOf } from '@storybook/react';
import { hostDecorator } from '../../utils';
import * as React from 'react';
import { DialogHeader } from './DialogHeader';

export const title = 'Title dialog';

storiesOf('Components|Dialog.DialogHeader', module)
  .addDecorator(hostDecorator({ width: '100%' }))
  .add('Base', () => <DialogHeader text={title} />)
  .add('rightComponent', () => <DialogHeader text={title} rightComponent={'content right'} />);