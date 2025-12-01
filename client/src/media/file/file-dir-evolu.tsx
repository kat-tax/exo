import {plural} from '@lingui/core/macro';
import {View} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {useEffect, useImperativeHandle, useMemo, memo, forwardRef, useRef} from 'react';
import {useSet} from 'app/data';
import {device} from 'app/data/lib/device';
import {PathId, DeviceId} from 'app/data/types';
import {useDirEvolu} from 'media/dir/hooks/use-dir-evolu';
import {DirEvolu} from 'media/dir/stacks/dir-evolu';
import media from 'media/store';

import type {FileProps} from 'media/file';

export interface FileDirEvolu extends FileProps {}

export interface DirEvoluRef {
  selectAll: () => void,
  presentFullscreen: () => void,
}

export default memo(forwardRef((
  {path, actions}: FileDirEvolu,
  ref: React.Ref<DirEvoluRef>,
) => {
  const set = useSet();
  const dirRef = useRef<View>(null);
  const evolu = useMemo(() => {
    const parts = path.replace('evolu://', '').split('/');
    const _device = DeviceId.from(parts[0]);
    const _path = PathId.from(parts[1]);
    let _deviceId = device.id;
    if (_device.ok) _deviceId = _device.value;
    let _pathId = null;
    if (_path.ok) _pathId = _path.value;
    return {deviceId: _deviceId, pathId: _pathId};
  }, [path]);

  const {dir, cmd, ext} = useDirEvolu(evolu.pathId, evolu.deviceId, true);
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
      const items = dir?.list?.map(e => `evolu://${evolu.deviceId}/${e.id}`);
      if (!items?.length) return;
      set(media.actions.selectBulk(items as string[]));
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
      <DirEvolu {...{dir, cmd, ext}}/>
    </View>
  ) : null;
}));

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    paddingVertical: theme.display.space2,
  },
}));
