import {t} from '@lingui/macro';
import {Text, View} from 'react-native';
import {useState} from 'react';
import {useLingui, Trans} from '@lingui/react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
//import {MarkdownTextInput} from '@expensify/react-native-live-markdown';
import {useClock} from 'home/hooks/useClock';
import {useWeather} from 'home/hooks/useWeather';
import {useDisplayName} from 'settings/hooks/useDisplayName';
import {getDayGreeting} from 'home/utils/time';
import {Prompt} from 'home/base/Prompt';
import {Page} from 'app/base/Page';

export default function ScreenHome() {
  const {styles} = useStyles(stylesheet);
  const [text, setText] = useState('Hello, *world*!');
  const [displayName] = useDisplayName();
  const weather = useWeather();
  const clock = useClock();

  useLingui();

  return (
    <Page
      title={<Trans id={getDayGreeting().id}/>}
      message={displayName ? t`Welcome, ${displayName}` : t`Welcome, Human`}
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
      <Prompt/>
      {/* <MarkdownTextInput
        value={text}
        onChangeText={setText}
      /> */}
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
