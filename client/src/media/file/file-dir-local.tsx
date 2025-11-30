import {plural} from '@lingui/core/macro';
import {useEffect, useImperativeHandle, useMemo, memo, forwardRef} from 'react';
import {useDirHfs} from 'media/dir/hooks/use-dir-hfs';
import {DirHfs} from 'media/dir/stacks/dir-hfs';
import {useSet} from 'app/data';
import media from 'media/store';

import type {FileProps} from 'media/file';

export interface FileDirLocal extends FileProps {}

export interface DirLocalRef {
  selectAll: () => void,
}

export default memo(forwardRef((
  {path, actions}: FileDirLocal,
  ref: React.Ref<DirLocalRef>,
) => {
  const set = useSet();
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

  useImperativeHandle(ref, () => ({
    selectAll: () => {
      const items = dir?.list?.map(e => path ? `${path}/${e.name}` : e.name);
      if (!items?.length) return;
      set(media.actions.selectBulk(items));
    },
  }));

  useEffect(() => {
    actions.setInfo(message);
  }, [message, actions]);

  return dir ? <DirHfs {...{dir, cmd, ext}}/> : null;
}));
