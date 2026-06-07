import {plural} from '@lingui/core/macro';
import {View} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {useEffect, useImperativeHandle, useMemo, memo, forwardRef, useRef} from 'react';
import {useSet} from 'app/data';
import {useDirHfs} from 'media/dir/hooks/use-dir-hfs';
import {DirHfs} from 'media/dir/stacks/dir-hfs';
import media from 'media/store';

import type {FileProps} from 'media/file';

export interface FileDirLocal extends FileProps {}

export interface DirLocalRef {
  selectAll: () => void,
  presentFullscreen: () => void,
}

export default memo(forwardRef((
  {path, actions}: FileDirLocal,
  ref: React.Ref<DirLocalRef>,
) => {
  const set = useSet();
  const dirRef = useRef<View>(null);
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
    presentFullscreen: () => {
      if (__WEB__ && dirRef.current) {
        const element = dirRef.current as unknown as HTMLElement;
        element.requestFullscreen?.();
      }
    },
  }));

  useEffect(() => {
    actions.setInfo(message);
  }, [message, actions]);

  return dir ? (
    <View ref={dirRef} style={styles.root}>
      <DirHfs {...{dir, cmd, ext}}/>
    </View>
  ) : null;
}));

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    paddingVertical: theme.display.space2,
  },
}));
