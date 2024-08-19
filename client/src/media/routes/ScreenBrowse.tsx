import {t} from '@lingui/macro';
import {View} from 'react-native';
import {useLingui} from '@lingui/react';
import {useLocation} from 'react-exo/navigation';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useAppContext} from 'app/hooks/useAppContext';
import {useDirectory} from 'media/hooks/useDirectory';
import {useInitDirectories} from 'media/hooks/useInitDirectories';
import {EntryDirectory} from 'media/stacks/EntryDirectory';
import {WatermarkEmpty} from 'media/stacks/WatermarkEmpty';
import {resolve} from 'media/utils/path';
import {Page} from 'app/interface/Page';

export default function ScreenBrowse() {
  const {pathname} = useLocation();
  const {styles} = useStyles(stylesheet);
  const {i18n} = useLingui();
  const parts = resolve(pathname);
  const path = parts.join('/');
  const name = parts[parts.length - 1] || t(i18n)`Files`;
  const base = parts.slice(0, -1).join('/') || '/';
  const entries = useDirectory(path, {showHidden: true});
  const {hasPreview} = useAppContext();

  useInitDirectories();

  return (
    <Page
      title={name}
      message={base ?? '/'}
      fullWidth={true}
      hasPreview={hasPreview}>
      <View style={styles.root}>
        {entries?.length === 0 &&
          <WatermarkEmpty {...{path}}/>
        }
        {entries?.map(entry => (
          <EntryDirectory key={entry.name} {...{entry, path}}/>
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
