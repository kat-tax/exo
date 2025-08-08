import App from 'app/layout';
import Home from 'home/routes';
import Settings from 'settings/routes';

export const Layout = {
  App,
}

export const Screen = {
  Home,
  Settings,
  get Design() {
    return require('../../../dev/screens/design').default;
  },
}
