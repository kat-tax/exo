import {Pressable} from 'react-native';
import {ListRow} from 'media/stacks/ListRow';

import type {Zip} from 'media/hooks/useFileZip';

export interface EntryZip {
  entry: Zip['list'][number],
  index: number,
  extract: (entry: Zip['list'][number]) => void,
}

export function EntryZip(props: EntryZip) {
  const {entry} = props;

  return (
    <Pressable onPress={() => props.extract(entry)}>
      <ListRow
        path={entry.name}
        name={entry.name}
        size={entry.size}
        index={props.index}
        isFile={!entry.dir}
      />
    </Pressable>
  );
}
