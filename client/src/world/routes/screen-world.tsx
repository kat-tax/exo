import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useLingui} from '@lingui/react/macro';
import {Link} from 'react-exo/navigation';
import {View} from 'react-native';
import {Panel} from 'app/stacks/panel';
import {Panel as DesignPanel} from 'design';

export default function ScreenWorld() {
  const {t} = useLingui();
  const {styles} = useStyles(stylesheet);

  return (
    <Panel>
      <View style={styles.root}>
        <Link to="/map">
          <DesignPanel
            header={t`Map`}
            message={t`View your device locations and geo-related info`}
          />
        </Link>
        <Link to="/news">
          <DesignPanel
            header={t`News`}
            message={t`View your latest news and rss feeds`}
          />
        </Link>
        <Link to="/calendar">
          <DesignPanel
            header={t`Calendar`}
            message={t`View your events and time-related info`}
          />
        </Link>
      </View>
    </Panel>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    gap: theme.display.space5,
    paddingBottom: theme.display.space5,
  },
}));
