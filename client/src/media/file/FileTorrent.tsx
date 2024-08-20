import Torrent from 'react-exo/torrent';
import {View} from 'react-native';
import {forwardRef} from 'react';
import {useCallback} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useDataArrayBuffer} from 'media/hooks/useDataArrayBuffer';
import {useTorrent} from 'media/hooks/useTorrent';
import {EntryTorrent} from 'media/stacks/EntryTorrent';
import {Page} from 'app/interface/Page';
import {bytesize} from 'app/utils/formatting';

import type {FileProps} from 'media/file';

interface FileTorrent extends FileProps {
  name: string,
  extension: string,
}

export default forwardRef((props: FileTorrent, _ref) => {
  const {styles} = useStyles(stylesheet);
  const buffer = useDataArrayBuffer(props.path);
  const torrent = useTorrent(buffer);
  const info = torrent?.info.comment
    ? `${torrent?.info.createdBy} – ${torrent?.info.comment}`
    : torrent?.info.createdBy;
  const msg = `${info} – ${bytesize(torrent?.data?.length ?? 0)}`;
  const entries = torrent?.data?.files.filter(entry => {
    const path = entry.path.split('/');
    return !path[0]?.startsWith('.____');
  });

  const download = useCallback(async (file: EntryTorrent['entry']) => {
    if (!buffer) return;
    const client = new Torrent();
    client.add(new File([buffer], props.name), async (torrent) => {
      const target = torrent.files.find((e) =>
        e.path.split('/').slice(1).join('/') === file.path);
      const folder = await navigator.storage.getDirectory();
      const handle = await folder.getFileHandle(file.name, {create: true});
      const stream = await handle.createWritable();
      // @ts-ignore
      const source = target?.stream();
      console.log(source);
      source?.pipeTo(stream);
    });
  }, [buffer, props.name]);

  return (
    <Page
      title={torrent?.info.name}
      message={msg}
      noFrame={!props.maximized}
      fullWidth>
      <View style={styles.root}>
        {entries?.map(entry => (
          <EntryTorrent key={entry.path} {...{entry, download}}/>
        ))}
      </View>
    </Page>
  )
});

const stylesheet = createStyleSheet((theme) => ({
  root: {
    paddingBottom: theme.display.space5,
  },
}));
