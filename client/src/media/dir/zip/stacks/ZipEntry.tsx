import {useMemo} from 'react';
import {Pressable} from 'react-native';
import {ListRow} from 'media/stacks/ListRow';

import {ZipMenu} from './ZipMenu';
import type {Zip} from '../types';

export interface ZipEntryProps {
  entry: Zip['list'][number],
  index: number,
  extract: (entry: Zip['list'][number]) => void,
}

export function ZipEntry(props: ZipEntryProps) {
  const {entry} = props;
  const {name, size, dir} = entry;
  const isFile = !dir;

  // Handlers for menu actions
  const actions = useMemo(() => ({
    menu: () => {},
    extract: () => props.extract(entry),
  }), [props.extract, entry]);

  return (
    <ZipMenu {...{name, actions}}>
      <Pressable onPress={actions.extract}>
        <ListRow {...{name, size, isFile}}/>
      </Pressable>
    </ZipMenu>
  );
}
