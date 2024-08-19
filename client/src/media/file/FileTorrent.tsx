//import WebTorrent from 'webtorrent';
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

  const download = useCallback((
    path: string,
    offset: number,
    length: number,
  ) => {
    if (!buffer) return;
    console.log('[download]', path, offset, length);
    /*const client = new WebTorrent();
    const file = new File([buffer], props.name);
    client.add(file, (torrent) => {
      // Got torrent metadata!
      console.log('[torrent]', torrent.infoHash, path);
      for (const file of torrent.files) {
        console.log(file.path);
      }
    });*/
  }, [buffer]);

  return (
    <Page title={torrent?.info.name} message={msg} fullWidth>
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
    padding: theme.display.space2,
  },
}));
