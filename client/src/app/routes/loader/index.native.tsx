import App from 'app/routes/layout';
import Settings from 'settings/routes/screen-settings';
import Dashboard from 'home/routes/screen-dashboard';

export const Layout = {
  App,
}

export const Screen = {
  Settings,
  Dashboard,
  get Design() {
    return require('../screen-design').default;
  },
}
