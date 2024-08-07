import {t} from '@lingui/macro';
import {useLingui} from '@lingui/react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {Link} from 'react-exo/navigation';
import {View} from 'react-native';
import {Page} from 'app/interface/Page';
import {Panel} from 'design';

export default function ScreenWorld() {
  const {i18n} = useLingui();
  const {styles} = useStyles(stylesheet);

  return (
    <Page>
      <View style={styles.root}>
        <Link to="/map">
          <Panel
            header={t(i18n)`Map`}
            message={t(i18n)`View your device locations and geo-related info`}
          />
        </Link>
        <Link to="/news">
          <Panel
            header={t(i18n)`News`}
            message={t(i18n)`View your latest news and rss feeds`}
          />
        </Link>
        <Link to="/calendar">
          <Panel
            header={t(i18n)`Calendar`}
            message={t(i18n)`View your events and time-related info`}
          />
        </Link>
      </View>
    </Page>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    gap: theme.display.space5,
    paddingBottom: theme.display.space5,
  },
}));
