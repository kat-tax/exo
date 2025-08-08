import {Trans} from '@lingui/react';
import {Text, View} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {useSettings} from 'settings/hooks/use-settings';
import {useClock} from 'home/hooks/use-clock';
import {greetMsg} from 'home/utils/time';
import {Panel} from 'app/stacks/panel';
import cfg from 'config';

export default function ScreenDashboard() {
  const settings = useSettings();
  const clock = useClock();

  return (
    <Panel
      title={cfg.APP_NAME}
      message={<Trans {...greetMsg(settings.name)}/>}
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

const styles = StyleSheet.create((theme) => ({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.display.space3,
  },
  clock: {
    fontFamily: theme.font.family,
    fontSize: theme.typography.size7,
    fontWeight: theme.typography.weightThin,
    letterSpacing: theme.font.headerSpacing,
    color: theme.colors.foreground,
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
