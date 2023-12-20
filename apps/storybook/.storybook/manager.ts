import {addons} from '@storybook/manager-api';
import dark from './theme/dark';

addons.setConfig({
  theme: dark,
  toolbar: {
    eject: {hidden: true},
  },
});
