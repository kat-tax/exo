import type {Plugin} from 'vite';

export default <Plugin> {
  name: 'html-config',
  transformIndexHtml(html) {
    return html.replace(
      /<title>(.*?)<\/title>/,
      `<title>Title replaced!</title>`,
    )
  },
}
