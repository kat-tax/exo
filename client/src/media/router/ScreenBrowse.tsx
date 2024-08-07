import {View} from 'react-native';
import {useLocation} from 'react-exo/navigation';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useInitDirectories} from 'media/hooks/useInitDirectories';
import {useDirectory} from 'media/hooks/useDirectory';
import {DirectoryEntry} from 'media/interface/DirectoryEntry';
import {WatermarkEmpty} from 'media/interface/WatermarkEmpty';
import {resolve} from 'media/utils/path';
import {Page} from 'app/interface/Page';

export default function ScreenBrowse() {
  const {pathname} = useLocation();
  const {styles} = useStyles(stylesheet);
  const parts = resolve(pathname);
  const path = parts.join('/');
  const name = parts[parts.length - 1];
  const base = parts.slice(0, -1).join('/') || '/';
  const entries = useDirectory(path, {showHidden: true});

  useInitDirectories();

  return (
    <Page title={name} message={base ?? '/'} fullWidth>
      <View style={styles.root}>
        {entries?.length === 0 &&
          <WatermarkEmpty
            {...{path}}
          />
        }
        {entries?.map(entry => (
          <DirectoryEntry
            key={entry.name}
            {...{entry, path}}
          />
        ))}
      </View>
    </Page>
  );
}

const stylesheet = createStyleSheet(() => ({
  root: {
    flex: 1,
  },
}));
