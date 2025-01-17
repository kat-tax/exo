import {Pressable} from 'react-native';
import {useRef, useMemo, useCallback} from 'react';
import {useLocation, useNavigate} from 'react-exo/navigation';
import {filesToHash, hashToFiles} from 'app/utils/formatting';
import {getData} from 'media/file/utils/data';
import {ListRow} from 'media/stacks/ListRow';
import {HfsMenu} from './HfsMenu';
import {useHfsEntryCmd} from '../hooks/useHfsEntryCmd';
import {useHfsEntryDnd} from '../hooks/useHfsEntryDnd';

import type {HfsDirectoryEntry} from 'react-exo/fs';
import type {View} from 'react-native';

export interface HfsEntryProps {
  entry: HfsDirectoryEntry,
  index: number,
  path?: string,
  flags?: {
    multiSelect?: boolean,
  },
}

export function HfsEntry(props: HfsEntryProps) {
  const {entry, flags, path} = props;
  const {name, size, isFile} = entry;
  const {hash} = useLocation();
  const ref = useRef<View>(null);
  const sel = useMemo(() => hashToFiles(hash), [hash]);
  const cmd = useHfsEntryCmd(entry);
  const dnd = useHfsEntryDnd(entry, cmd, ref);
  const nav = useNavigate();

  const isSelected = useMemo(() => sel.includes(name), [sel, name]);
  const isFocused = useMemo(() => dnd.isDropping, [dnd.isDropping]);
  const isBlurred = useMemo(() => dnd.isDragging, [dnd.isDragging]);

  // Update link when selection changes
  const link = useMemo(() => {
    // Files are stored in the hash
    if (isFile) {
      return filesToHash(flags?.multiSelect
        ? sel.includes(name)
          ? sel.filter(e => e !== name)
          : [...sel, name]
        : [name]);
    }
    // Otherwise, we use the path (if not root)
    if (path) {
      return `${path}/${name}`;
    }
    // Otherwise, we use the entry name
    return name;
  }, [name, path, flags, sel, isFile]);

  // Download file
  const download = useCallback(async () => {
    const source = await getData(`${path}/${name}`, 'dataUrl');
    if (!source) return;
    // FIXME: web specific (move to fs service)
    const a = document.createElement('a');
    a.download = name;
    a.href = source;
    a.click();
    setTimeout(() => URL.revokeObjectURL(source), 100);
  }, [path, name]);

  // Handlers for menu actions
  const actions = useMemo(() => ({
    menu: () => {},
    view: () => nav(link),
    share: () => {},
    download: isFile ? download : undefined,
    copy: () => {},
    move: () => {},
    rename: () => {},
    delete: cmd.del,
  }), [link, isFile, cmd.del, nav, download]);

  return (
    <HfsMenu {...{name, actions}}>
      <Pressable {...{ref, onPress: actions.view}}>
        <ListRow {...{name, size, isFile, isSelected, isFocused, isBlurred}}/>
      </Pressable>
    </HfsMenu>
  );
}
