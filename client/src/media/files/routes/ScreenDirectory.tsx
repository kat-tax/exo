import {View} from 'react-native';
import {useLocation} from 'react-exo/navigation';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useInitDirectories} from 'media/files/hooks/useInitDirectories';
import {useDirectory} from 'media/files/hooks/useDirectory';
import {DirectoryEntry} from 'media/files/base/DirectoryEntry';
import {resolve} from 'media/files/utils/path';

export default function ScreenDirectory() {
  const {pathname} = useLocation();
  const {styles} = useStyles(stylesheet);
  const path = resolve(pathname);
  const dir = useDirectory(path.join('/'));
  useInitDirectories();
  return (
    <View style={styles.root}>
      {dir?.map(entry => (
        <DirectoryEntry
          key={entry.name}
          entry={entry}
          path={path.join('/')}
        />
      ))}
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  root: {
    flex: 1,
    margin: theme.display.space3,
  },
}));
