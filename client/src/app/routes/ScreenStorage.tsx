import {Trans, t} from '@lingui/macro';
import {useLingui} from '@lingui/react';
import {useState, useEffect} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {getDiskSpace} from 'react-exo/fs';
import {View, Text} from 'react-native';
import {Page} from 'app/interface/Page';
import {PageItem} from 'app/interface/PageItem';
import {PageSection} from 'app/interface/PageSection';
import {bytesize} from 'app/utils/formatting';

export default function ScreenStorage() {
  const [storage, setStorage] = useState<{msg: string, val: number}>();
  const {styles} = useStyles(stylesheet);
  const {i18n} = useLingui();

  useEffect(() => {
    getDiskSpace().then(e => setStorage({
      msg: `${bytesize(e.used)} / ${bytesize(e.total)}`,
      val: (e.used / e.total) * 100,
    }));
  });

  return (
    <Page
      title={<Trans>Storage</Trans>}
      message={<Trans>Manage your storage</Trans>}>
      <View style={styles.root}>
        <PageSection title={t(i18n)`Overview`}>
          <PageItem
            label={t(i18n)`Device Space`}
            description={t(i18n)`Storage used and available on this device.`}>
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
