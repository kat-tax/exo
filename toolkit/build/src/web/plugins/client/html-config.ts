import type {Plugin} from 'vite';
import config from 'config';

export default <Plugin> {
  name: 'html-config',
  transformIndexHtml(html) {
    return html
      .replace(/APP_NAME/g, config.APP_NAME)
  },
}
