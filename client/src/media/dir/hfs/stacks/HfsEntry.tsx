import {Pressable} from 'react-native';
import {useMemo, useCallback} from 'react';
import {useLocation, useNavigate} from 'react-exo/navigation';
import {filesToHash, hashToFiles} from 'app/utils/formatting';
import {getData} from 'media/file/utils/data';
import {ListRow} from 'media/stacks/ListRow';

import {HfsMenu} from './HfsMenu';
import {useHfsEntry} from '../hooks/useHfsEntry';

import type {HfsDirectoryEntry} from 'react-exo/fs';

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
  const ctx = useHfsEntry(entry);
  const nav = useNavigate();

  // Update selection when hash changes
  const selection = useMemo(() => hashToFiles(hash), [hash]);
  const isSelected = useMemo(() => selection.includes(name), [selection, name]);

  // Update link when selection changes
  const link = useMemo(() => {
    // Files are stored in the hash
    if (isFile) {
      return filesToHash(flags?.multiSelect
        ? selection.includes(name)
          ? selection.filter(e => e !== name)
          : [...selection, name]
        : [name]);
    }
    // Otherwise, we use the path (if not root)
    if (path) {
      return `${path}/${name}`;
    }
    // Otherwise, we use the entry name
    return name;
  }, [name, path, flags, selection, isFile]);

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
    delete: ctx.del,
  }), [link, isFile, ctx.del, nav, download]);

  return (
    <HfsMenu {...{name, actions}}>
      <Pressable onPress={actions.view}>
        <ListRow {...{name, size, isFile, isSelected}}/>
      </Pressable>
    </HfsMenu>
  );
}
