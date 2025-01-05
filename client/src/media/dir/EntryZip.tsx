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
        name={entry.name}
        size={entry.size}
        isFile={!entry.dir}
      />
    </Pressable>
  );
}
