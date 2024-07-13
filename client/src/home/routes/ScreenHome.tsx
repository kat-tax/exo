import {Trans as T} from '@lingui/macro';
import {Trans} from '@lingui/react';
import {Text, View} from 'react-native';
import {useQuery} from '@evolu/react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useDisplayName} from 'settings/hooks/useDisplayName';
import {useClock} from 'home/hooks/useClock';
import {useWeather} from 'home/hooks/useWeather';
import {getDayGreeting} from 'home/utils/time';
import {AiPrompt} from 'home/base/AiPrompt';
import {Page} from 'app/base/Page';
import {todosWithCategories} from "app/data";


export default function ScreenHome() {
  const {styles} = useStyles(stylesheet);
  const [displayName] = useDisplayName();
  const weather = useWeather();
  const clock = useClock();

  const {rows} = useQuery(todosWithCategories);
  console.log(rows);
  
  return (
    <Page
      title={<Trans id={getDayGreeting().id}/>}
      message={displayName
        ? <T>{`Welcome, ${displayName}`}</T>
        : <T>{`Welcome, Human`}</T>}
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
      <View>
        {rows.map((row) => (
          <Text key={row.id}>{row.title}</Text>
        ))}
      </View>
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
