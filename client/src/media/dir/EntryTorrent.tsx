import {useMemo} from 'react';
import {Pressable} from 'react-native';
import {ListRow} from 'media/stacks/ListRow';
import {EntryTorrentMenu} from 'media/dir/EntryTorrentMenu';

import type {TorrentFileEntry} from 'media/utils/torrent';

export interface EntryTorrent {
  entry: TorrentFileEntry,
  index: number,
  download: (entry: TorrentFileEntry) => void,
}

export function EntryTorrent(props: EntryTorrent) {
  const {entry} = props;
  const {name, length} = entry;
  const size = length;
  const isFile = true;

  // Handlers for menu actions
  const actions = useMemo(() => ({
    menu: () => {},
    download: () => props.download(entry),
  }), [props.download, entry]);

  return (
    <EntryTorrentMenu {...{name, actions}}>
      <Pressable onPress={actions.download}>
        <ListRow {...{name, size, isFile}}/>
      </Pressable>
    </EntryTorrentMenu>
  );
}
