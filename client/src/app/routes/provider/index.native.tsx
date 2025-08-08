import App from 'app/layout';
import Settings from 'settings/settings';
import Dashboard from 'home/dashboard';

export const Layout = {
  App,
}

export const Screen = {
  Settings,
  Dashboard,
  get Design() {
    return require('../../../dev/design').default;
  },
}
