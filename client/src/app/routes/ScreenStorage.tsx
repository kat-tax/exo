import {useLingui} from '@lingui/react/macro';
import {useState, useEffect} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {getDiskSpace} from 'react-exo/fs';
import {View, Text} from 'react-native';
import {bytesize} from 'app/utils/formatting';
import {Page} from 'app/interface/Page';
import {PageItem} from 'app/interface/PageItem';
import {PageSection} from 'app/interface/PageSection';

export default function ScreenStorage() {
  const [storage, setStorage] = useState<{msg: string, val: number}>();
  const {styles} = useStyles(stylesheet);
  const {t} = useLingui();

  useEffect(() => {
    getDiskSpace().then(e => setStorage({
      msg: `${bytesize(e.used)} / ${bytesize(e.total)}`,
      val: (e.used / e.total) * 100,
    }));
  });

  return (
    <Page
      title={t`Storage`}
      message={t`Manage your storage`}>
      <View style={styles.root}>
        <PageSection title={t`Overview`}>
          <PageItem
            label={t`Device Space`}
            description={t`Storage used and available on this device.`}>
            <Text style={styles.text}>
              {storage?.msg ?? '0GB / 0GB'}
            </Text>
          </PageItem>
        </PageSection>
      </View>
    </Page>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    marginTop: theme.display.space5,
    paddingBottom: theme.display.space9,
  },
  text: {
    fontSize: theme.font.size,
    fontFamily: theme.font.family,
    lineHeight: theme.font.height,
    fontWeight: theme.font.weight,
    letterSpacing: theme.font.spacing,
    color: theme.colors.foreground,
  },
}));
