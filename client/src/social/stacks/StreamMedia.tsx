import {Media} from 'media/stacks/Media';

export interface StreamMediaProps {
  name: string;
  tokens?: number;
}

export function StreamMedia(props: StreamMediaProps) {
  const {name} = props;
  const path = `https://localhost/live/stream/${name}`;
  const url = `/live/${name}`;
  const ext = 'm3u8';

  return name ? (
    <Media
      {...{name, ext, url, path}}
      close={() => fetch(`https://localhost/live/cancel/${name}`)}
      embedded={false}
      maximized
      vertical
    />
  ) : null;
}
