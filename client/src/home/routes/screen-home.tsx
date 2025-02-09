import {Text, View} from 'react-native';
import {useMemo} from 'react';
import {useLingui} from '@lingui/react/macro';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useAppContext} from 'app/hooks/useAppContext';
import {useWeather} from 'home/hooks/useWeather';
import {useClock} from 'home/hooks/useClock';
import {Assistant} from 'home/stacks/assistant';
import {getTimeOfDay} from 'home/utils/time';
import {Panel} from 'app/stacks/panel';

export default function ScreenHome() {
  const {device, profile} = useAppContext();
  const {styles} = useStyles(stylesheet);
  const weather = useWeather(device?.coords);
  const clock = useClock();
  const {t} = useLingui();

  const greeting = useMemo(() => {
    switch (getTimeOfDay()) {
      case 'morning':
        return t`Good morning`;
      case 'afternoon':
        return t`Good afternoon`;
      case 'evening':
        return t`Good evening`;
      case 'night':
        return t`Enjoy the night`;
      default:
        return t`Enjoy the day`;
    }
  }, [t]);

  return (
    <Panel
      title={greeting}
      message={profile?.name
        ? t`Welcome, ${profile.name}`
        : t`Welcome, Human`
      }
      widget={
        <View style={styles.widget}>
          <Text style={styles.clock}>
            {clock}
          </Text>
          <Text style={styles.weather}>
            {weather.text}
          </Text>
        </View>
      }>
      <Assistant/>
    </Panel>
  );
}

const stylesheet = createStyleSheet(theme => ({
  widget: {
    flex: 1,
    gap: theme.display.space2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  clock: {
    fontWeight: '200',
    fontFamily: theme.font.family,
    fontSize: theme.font.headerSize,
    letterSpacing: theme.font.headerSpacing,
    color: theme.colors.foreground,
  },
  weather: {
    alignSelf: 'flex-end',
    fontWeight: '200',
    fontFamily: theme.font.family,
    fontSize: theme.font.contentSize,
    letterSpacing: theme.font.contentSpacing,
    color: theme.colors.mutedForeground,
  },
}));
