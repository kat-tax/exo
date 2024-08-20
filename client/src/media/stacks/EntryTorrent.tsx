import {Pressable} from 'react-native';
import {ListRow} from './ListRow';

import type {TorrentFileData} from 'media/utils/torrent';

export interface EntryTorrent {
  entry: TorrentFileData['files'][number],
  download: (entry: TorrentFileData['files'][number]) => void,
}

export function EntryTorrent(props: EntryTorrent) {
  const {entry} = props;

  return (
    <Pressable onPress={() => props.download(entry)}>
      <ListRow
        path={entry.path}
        name={entry.name}
        size={entry.length}
        isFile={true}
      />
    </Pressable>
  );
}
