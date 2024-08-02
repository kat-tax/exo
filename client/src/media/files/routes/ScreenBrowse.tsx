import {View} from 'react-native';
import {useLocation} from 'react-exo/navigation';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useInitDirectories} from 'media/files/hooks/useInitDirectories';
import {useDirectory} from 'media/files/hooks/useDirectory';
import {DirectoryEntry} from 'media/files/base/DirectoryEntry';
import {WatermarkEmpty} from 'media/files/base/WatermarkEmpty';
import {resolve} from 'media/files/utils/path';
import {Page} from 'app/base/Page';

export default function ScreenBrowse() {
  const {pathname} = useLocation();
  const {styles} = useStyles(stylesheet);
  const parts = resolve(pathname);
  const dir = useDirectory(parts.join('/'), {showHidden: true});
  const path = parts.join('/');
  const base = parts.slice(0, -1).join('/') || '/';
  const [name] = parts[parts.length - 1];

  useInitDirectories();

  return (
    <Page title={name} message={base ?? '/'} fullWidth>
      <View style={styles.root}>
        {dir?.length === 0 &&
          <WatermarkEmpty
            {...{path}}
          />
        }
        {dir?.map(entry => (
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
