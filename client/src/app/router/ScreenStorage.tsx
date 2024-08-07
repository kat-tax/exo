import {View} from 'react-native';
import {Trans, t} from '@lingui/macro';
import {useLingui} from '@lingui/react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {PageSection} from 'app/interface/PageSection';
import {Page} from 'app/interface/Page';

export default function ScreenStorage() {
  const {i18n} = useLingui();
  const {styles} = useStyles(stylesheet);

  return (
    <Page
      title={<Trans>Storage</Trans>}
      message={<Trans>Manage your storage</Trans>}>
      <View style={styles.root}>
        <PageSection title={t(i18n)`Overview`}>

        </PageSection>
      </View>
    </Page>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    paddingBottom: theme.display.space9,
  },
}));
