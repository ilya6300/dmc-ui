import { fn } from 'storybook/test';

import { Button_v2 } from './Button_v2';

export default {
  title: 'Example/Button_v2',
  component: Button_v2,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
};

export const Default = {
  args: {
    label: 'Button',
  },
};
