import {plural} from '@lingui/core/macro';
import {useEffect, useMemo, forwardRef} from 'react';
import {useDirHfs} from 'media/dir/hooks/use-dir-hfs';
import {DirHfs} from 'media/dir/stacks/dir-hfs';
import {Panel} from 'app/ui/panel';

import type {FileProps} from 'media/file';

export interface FileDirectory extends FileProps {}

export default forwardRef((
  {path, name, actions, embedded}: FileDirectory,
  _ref: React.Ref<unknown>,
) => {
  const {hfs, cmd, ext} = useDirHfs(path, true);
  const {folders, files} = useMemo(() => hfs?.list?.reduce((acc, item) => {
    if (item.isFile) acc.files++;
    else acc.folders++;
    return acc;
  }, {folders: 0, files: 0}), [hfs]);

  const message = useMemo(() => {
    const _folders = plural(folders, {one: '# folder', other: '# folders'});
    const _files = plural(files, {one: '# file', other: '# files'});
    return folders > 0 ? `${_folders}, ${_files}` : _files;
  }, [folders, files]);

  useEffect(() => {
    actions.setInfo(message);
  }, [message, actions]);

  return (
    <Panel
      title={embedded ? name : undefined}
      message={embedded ? message : undefined}
      margin="none"
      transparent
      noframe
      fluid>
      {hfs && <DirHfs {...{hfs, cmd, ext}}/>}
    </Panel>
  );
});
