import {Pressable} from 'react-native';
import {ListRow} from 'media/stacks/ListRow';

import type {TorrentFileEntry} from 'media/utils/torrent';

export interface EntryTorrent {
  entry: TorrentFileEntry,
  index: number,
  download: (entry: TorrentFileEntry) => void,
}

export function EntryTorrent(props: EntryTorrent) {
  const {entry} = props;

  return (
    <Pressable onPress={() => props.download(entry)}>
      <ListRow
        name={entry.name}
        size={entry.length}
        isFile={true}
      />
    </Pressable>
  );
}
