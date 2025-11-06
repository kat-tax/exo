import {plural} from '@lingui/core/macro';
import {useEffect, forwardRef, useMemo} from 'react';
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
  const [title, files, size] = useMemo(() => torrent ? [
    torrent.info.name,
    torrent.list.length,
    torrent.list.reduce((acc, file) => acc + file.length, 0),
  ] : ['', 0, 0], [torrent]);

  const message = useMemo(() => {
    const _files = plural(files, {one: '# file', other: '# files'});
    const _size = bytesize(size);
    return `${_files} – ${_size}`;
  }, [files, size]);

  useEffect(() => {
    actions.setTitle(title);
    actions.setInfo(message);
  }, [title, message, actions]);

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
