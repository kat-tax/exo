import {Trans} from '@lingui/react';
import {Trans as T} from '@lingui/macro';
import {Text, View} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useProfile} from 'app/hooks/useProfile';
import {useClock} from 'home/hooks/useClock';
import {useWeather} from 'home/hooks/useWeather';
import {getDayGreeting} from 'home/utils/time';
import {AiPrompt} from 'home/base/AiPrompt';
import {Page} from 'app/base/Page';

export default function ScreenHome() {
  const {styles} = useStyles(stylesheet);
  const profile = useProfile();
  const clock = useClock();
  const weather = useWeather();

  return (
    <Page
      title={<Trans id={getDayGreeting().id}/>}
      message={profile?.name
        ? <T>{`Welcome, ${profile.name}`}</T>
        : <T>{'Welcome, Human'}</T>
      }
      widget={
        <View style={styles.widget}>
          <Text style={styles.clock}>
            {clock}
          </Text>
          <Text
            style={[
              styles.weather,
              !weather.authorized && styles.weatherPrompt,
            ]}
            onPress={!weather.authorized
              ? weather.request
              : undefined}>
            {weather.text}
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
    color: theme.colors.mutedForeground,
    alignSelf: 'flex-end',
  },
  weatherPrompt: {
    color: theme.colors.mutedForeground,
  },
}));
