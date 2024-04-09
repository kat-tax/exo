import type {Plugin} from 'vite';
import config from 'config';

const replacements = Object
  .entries(config)
  .map(([key, value]) => [
    new RegExp(`__${key}__`, 'g'),
    value,
  ]);

export default <Plugin> {
  name: 'html-config',
  transformIndexHtml(html) {
    let out = html;
    replacements.forEach(([reg, val]) => {
      out = out.replace(reg, val);
    });
    return out;
  },
}
