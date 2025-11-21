import {plural} from '@lingui/core/macro';
import {useEffect, useMemo, forwardRef} from 'react';
import {useDirHfs} from 'media/dir/hooks/use-dir-hfs';
import {DirHfs} from 'media/dir/stacks/dir-hfs';

import type {FileProps} from 'media/file';

export interface FileDirLocal extends FileProps {}

export default forwardRef((
  {path, actions}: FileDirLocal,
  _ref: React.Ref<unknown>,
) => {
  const {dir, cmd, ext} = useDirHfs(path, true);
  const {folders, files} = useMemo(() => dir?.list?.reduce((acc, item) => {
    if (item.isFile) acc.files++;
    else acc.folders++;
    return acc;
  }, {folders: 0, files: 0}), [dir]);

  const message = useMemo(() => {
    const _folders = plural(folders, {one: '# folder', other: '# folders'});
    const _files = plural(files, {one: '# file', other: '# files'});
    return folders > 0 ? `${_folders}, ${_files}` : _files;
  }, [folders, files]);

  useEffect(() => {
    actions.setInfo(message);
  }, [message, actions]);

  return dir ? <DirHfs {...{dir, cmd, ext}}/> : null;
});
