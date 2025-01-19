import {useRef, useMemo, useCallback} from 'react';
import {useNavigate} from 'react-exo/navigation';
import {useDispatch} from 'react-redux';
import {Pressable} from 'react-native';
import {getData} from 'media/file/utils/data';
import {ListRow} from 'media/stacks/ListRow';
import {HfsMenu} from './HfsMenu';
import {saveAs} from '../utils/fs';
import {useHfsEntryCmd} from '../hooks/useHfsEntryCmd';
import {useHfsEntryDnd} from '../hooks/useHfsEntryDnd';
import media from 'media/store';

import type {HfsDirectoryEntry} from 'react-exo/fs';
import type {GestureResponderEvent, View} from 'react-native';

export interface HfsEntryProps {
  entry: HfsDirectoryEntry,
  index: number,
  basePath?: string,
  isSelected?: boolean,
}

export function HfsEntry(props: HfsEntryProps) {
  const {entry, basePath, isSelected} = props;
  const {name, size, isFile} = entry;

  const ref = useRef<View>(null);
  const cmd = useHfsEntryCmd(entry);
  const dnd = useHfsEntryDnd(entry, cmd, ref);

  const put = useDispatch();
  const nav = useNavigate();

  const isFocused = useMemo(() => dnd.isDropping, [dnd.isDropping]);
  const isBlurred = useMemo(() => dnd.isDragging, [dnd.isDragging]);
  const path = useMemo(() => basePath ? `${basePath}/${name}` : name, [basePath, name]);

  const view = useCallback((e?: GestureResponderEvent) => {
    // @ts-expect-error RNW property
    const [isRange, isMulti] = [e?.shiftKey, e?.metaKey || e?.ctrlKey];
    if (isFile) {
      put(media.actions.selectItem({path, isMulti, isRange}));
    } else {
      nav(path);
    }
  }, [isFile, path, nav, put]);

  const download = useCallback(async () => {
    if (isFile) {
      saveAs(await getData(path, 'dataUrl'), name);
    }
  }, [isFile, path, name]);

  // Handlers for menu actions
  const actions = useMemo(() => ({
    menu: () => {},
    view,
    share: () => {},
    download,
    copy: () => {},
    move: () => {},
    rename: () => {},
    delete: cmd.del,
  }), [cmd.del, download, view]);

  return (
    <HfsMenu {...{name, actions}}>
      <Pressable {...{ref, onPress: actions.view}}>
        <ListRow {...{name, size, isFile, isSelected, isFocused, isBlurred}}/>
      </Pressable>
    </HfsMenu>
  );
}
