import {Trans} from '@lingui/react';
import {Trans as T} from '@lingui/macro';
import {Text, View} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useQuery} from '@evolu/react-native';
import {useClock} from 'home/hooks/useClock';
import {useWeather} from 'home/hooks/useWeather';
import {getDayGreeting} from 'home/utils/time';
import {AiPrompt} from 'home/base/AiPrompt';
import {Page} from 'app/base/Page';
import {profile} from 'app/data';

export default function ScreenHome() {
  const {row} = useQuery(profile);
  const {styles} = useStyles(stylesheet);
  const weather = useWeather();
  const clock = useClock('medium');

  return (
    <Page
      title={<Trans id={getDayGreeting().id}/>}
      message={row?.name
        ? <T>{`Welcome, ${row.name}`}</T>
        : <T>{`Welcome, Human`}</T>
      }
      widget={
        <View style={styles.widget}>
          <Text style={styles.clock}>
            {clock}
          </Text>
          <Text style={styles.weather}>
            {weather}
          </Text>
        </View>
      }>
      <AiPrompt/>
    </Page>
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
    fontWeight: '200',
    fontFamily: theme.font.family,
    fontSize: theme.font.contentSize,
    letterSpacing: theme.font.contentSpacing,
    color: theme.colors.foreground,
    alignSelf: 'flex-end',
  },
}));
