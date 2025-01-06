import {Pressable} from 'react-native';
import {useMemo} from 'react';
import {useLocation, useNavigate} from 'react-exo/navigation';
import {filesToHash, hashToFiles} from 'app/utils/formatting';
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

  // Handlers for menu actions
  const actions = useMemo(() => ({
    menu: () => {},
    view: () => nav(link),
    share: () => {},
    copy: () => {},
    move: () => {},
    rename: () => {},
    delete: ctx.del,
  }), [link, ctx.del, nav]);

  return (
    <HfsMenu {...{name, actions}}>
      <Pressable onPress={actions.view}>
        <ListRow {...{name, size, isFile, isSelected}}/>
      </Pressable>
    </HfsMenu>
  );
}
