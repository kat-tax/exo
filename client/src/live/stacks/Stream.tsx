import {Media} from 'media/stacks/Media';

export interface StreamProps {
  name: string;
  tokens?: number;
}

export function Stream(props: StreamProps) {
  const {name} = props;
  const path = `https://localhost/live/stream/${name}`;
  const url = `/live/${name}`;
  const ext = 'm3u8';

  return name ? (
    <Media
      {...{name, ext, url, path}}
      close={() => fetch(`https://localhost/live/cancel/${name}`)}
      maximized
      vertical
    />
  ) : null;
}
