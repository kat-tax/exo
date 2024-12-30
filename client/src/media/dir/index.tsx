import {memo} from 'react';
import {DirHfs} from 'media/dir/DirHfs';
//import {DirEmpty} from 'media/dir/DirEmpty';
import {useDirHfs} from 'media/hooks/useDirHfs';

import type {DirTorrentProps} from 'media/dir/DirTorrent';

export interface DirBaseProps {
  path: string,
}

export type DirProps =
  | DirBaseProps
  | DirTorrentProps

export default memo((props: DirProps) => {
  const {path, entries, provider} = useDirHfs(props.path, {
    showHidden: true,
  });

  console.log({path, entries, provider});

  // if (entries.length === 0) {
  //   return <DirEmpty {...{path}}/>
  // }

  switch (provider) {
    case 'fs':
    case 'ipfs':
      return <DirHfs key={path} {...{path, entries}}/>
    default: provider satisfies never;
  }

  return null;
});
