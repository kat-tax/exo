import {useEffect, forwardRef} from 'react';
import {useDirTorrent} from 'media/dir/hooks/use-dir-torrent';
import {DirTorrent} from 'media/dir/stacks/dir-torrent';
import {bytesize} from 'app/utils/formatting';
import {Panel} from 'app/stacks/panel';

import type {FileProps} from 'media/file';

export interface FileTorrent extends FileProps {}

export default forwardRef((
  {path, name, actions, embedded}: FileTorrent,
  _ref,
) => {
  const {torrent, cmd} = useDirTorrent(path);

  useEffect(() => {
    if (!torrent) return;
    const size = bytesize(torrent.list.reduce((acc, file) => acc + file.length, 0));
    actions.setInfo(`${torrent.list.length} files, ${size}`);
    actions.setTitle(torrent.info.name);
  }, [torrent, actions]);

  return (
    <Panel
      title={embedded ? name : undefined}
      message={embedded ? `${torrent?.info.name}` : undefined}
      margin={embedded ? 'small' : 'none'}
      transparent
      noframe
      fluid>
      {torrent && <DirTorrent {...{torrent, cmd}}/>}
    </Panel>
  )
});
