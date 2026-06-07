import {plural} from '@lingui/core/macro';
import {bytesize} from 'react-exo/fs';
import {forwardRef, useEffect, useMemo} from 'react';
import {useDirZip} from 'media/dir/hooks/use-dir-zip';
import {DirZip} from 'media/dir/stacks/dir-zip';

import type {FileProps} from 'media/file';

export interface FileZip extends FileProps {}

export default forwardRef((
  {path, actions}: FileZip,
  _ref,
) => {
  const {zip, cmd} = useDirZip(path);
  const [files, size] = useMemo(() => zip ? [
    zip.list?.length ?? 0,
    zip.size?.compressed ?? 0,
  ] : [0, 0], [zip]);

  const message = useMemo(() => {
    const _files = plural(files, {one: '# file', other: '# files'});
    const _size = bytesize(size);
    return `${_files} – ${_size}`;
  }, [files, size]);

  useEffect(() => {
    actions.setInfo(message);
  }, [message, actions]);

  return zip ? (
    <DirZip {...{zip, cmd}}/>
  ) : null;
});
