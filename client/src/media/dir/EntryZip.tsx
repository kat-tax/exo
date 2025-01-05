import {useMemo} from 'react';
import {Pressable} from 'react-native';
import {ListRow} from 'media/stacks/ListRow';
import {EntryZipMenu} from 'media/dir/EntryZipMenu';

import type {Zip} from 'media/hooks/useFileZip';

export interface EntryZip {
  entry: Zip['list'][number],
  index: number,
  extract: (entry: Zip['list'][number]) => void,
}

export function EntryZip(props: EntryZip) {
  const {entry} = props;
  const {name, size, dir} = entry;
  const isFile = !dir;

  // Handlers for menu actions
  const actions = useMemo(() => ({
    menu: () => {},
    extract: () => props.extract(entry),
  }), [props.extract, entry]);

  return (
    <EntryZipMenu {...{name, actions}}>
      <Pressable onPress={actions.extract}>
        <ListRow {...{name, size, isFile}}/>
      </Pressable>
    </EntryZipMenu>
  );
}
