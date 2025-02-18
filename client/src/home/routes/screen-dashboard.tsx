import {Text, View} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useLingui} from '@lingui/react/macro';
import {useClock} from 'home/hooks/use-clock';
import {Panel} from 'app/stacks/panel';

export default function ScreenDashboard() {
  const {styles} = useStyles(stylesheet);
  const clock = useClock();
  const {t} = useLingui();

  return (
    <Panel
      title={t`Welcome to EXO`}
      message={t`Godspeed!`}
      widget={
        <View style={styles.widget}>
          <Text style={styles.clock}>
            {clock}
          </Text>
        </View>
      }>
    </Panel>
  );
}

const stylesheet = createStyleSheet(theme => ({
  widget: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    gap: theme.display.space2,
  },
  clock: {
    fontFamily: theme.font.family,
    fontSize: theme.typography.size8,
    fontWeight: theme.typography.weightThin,
    letterSpacing: theme.font.headerSpacing,
    color: theme.colors.foreground,
  },
}));
