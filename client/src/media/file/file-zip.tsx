import {plural} from '@lingui/core/macro';
import {forwardRef, useEffect, useMemo} from 'react';
import {useDirZip} from 'media/dir/hooks/use-dir-zip';
import {DirZip} from 'media/dir/stacks/dir-zip';
import {Panel} from 'app/ui/panel';
import {bytesize} from 'app/lib/formatting';

import type {FileProps} from 'media/file';

export interface FileZip extends FileProps {}

export default forwardRef((
  {path, name, actions, embedded}: FileZip,
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

  return (
    <Panel
      title={embedded ? name : undefined}
      message={embedded ? message : undefined}
      margin={embedded ? 'small' : 'none'}
      transparent
      noframe
      fluid>
      {zip && <DirZip {...{zip, cmd}}/>}
    </Panel>
  )
});
