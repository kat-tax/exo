import {Text, View} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useClock} from 'home/hooks/use-clock';
import {Panel} from 'app/stacks/panel';
import {Logo} from 'design';
import cfg from 'config';

export default function ScreenDashboard() {
  const {styles} = useStyles(stylesheet);
  const clock = useClock();

  return (
    <Panel
      left={
        <View style={styles.header}>
          <Logo/>
          <Text style={styles.name}>
            {cfg.APP_NAME}
          </Text>
        </View>
      }
      right={
        <Text style={styles.clock}>
          {clock}
        </Text>
      }>
      <View style={styles.main}>
        {/** TIP: Add content here */}
      </View>
    </Panel>
  );
}

const stylesheet = createStyleSheet(theme => ({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.display.space3,
  },
  name: {
    fontFamily: theme.font.family,
    fontSize: theme.typography.size8,
    fontWeight: theme.typography.weightThin,
    letterSpacing: theme.font.headerSpacing,
    color: theme.colors.foreground,
  },
  clock: {
    fontFamily: theme.font.family,
    fontSize: theme.typography.size8,
    fontWeight: theme.typography.weightThin,
    letterSpacing: theme.font.headerSpacing,
    color: theme.colors.mutedForeground,
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
