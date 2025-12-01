import {plural} from '@lingui/core/macro';
import {bytesize} from 'react-exo/fs';
import {useEffect, forwardRef, useMemo} from 'react';
import {useDirTorrent} from 'media/dir/hooks/use-dir-torrent';
import {DirTorrent} from 'media/dir/stacks/dir-torrent';

import type {FileProps} from 'media/file';

export interface FileTorrent extends FileProps {}

export default forwardRef((
  {path, actions}: FileTorrent,
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

  return torrent ? (
    <DirTorrent {...{torrent, cmd}}/>
  ) : null;
});
