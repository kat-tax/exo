import {t} from '@lingui/macro';
import {Text, View, TextInput} from 'react-native';
import {useStyles, createStyleSheet} from 'design/styles';
import {useLingui, Trans} from '@lingui/react';
import {useRef} from 'react';
import {useAI} from 'home/hooks/useAI';
import {useClock} from 'home/hooks/useClock';
import {useWeather} from 'home/hooks/useWeather';
import {getDayGreeting, formatDate} from 'home/utils/time';
import {PageLoading} from 'app/base/PageLoading';
import {Markdown} from 'app/base/Markdown';
import {Page} from 'app/base/Page';

export default function ScreenHome() {
  const {styles, theme} = useStyles(stylesheet);
  const weather = useWeather();
  const clock = useClock();
  const ref = useRef<TextInput>(null);
  const ai = useAI(ref);

  useLingui();

  return (
    <Page
      fullWidth
      title={<Trans id={getDayGreeting().id}/>}
      message={t`Welcome, ${'Human'}`}
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
      <View style={styles.ai}>
        {ai.archive &&
          <View style={styles.archive}>
            <TextInput
              style={styles.prompt}
              value={ai.response?.[0]}
              onKeyPress={ai.history}
              autoFocus
              readOnly
            />
            <Text style={styles.timestamp}>
              {formatDate(new Date(ai.response?.[2]))}
            </Text>
          </View>
        }
        {!ai.archive &&
          <TextInput
            ref={ref}
            style={styles.prompt}
            placeholder="Ask anything..."
            placeholderTextColor={theme.colors.mutedForeground}
            onSubmitEditing={(e) => ai.prompt(e.nativeEvent.text)}
            onKeyPress={ai.history}
            selectTextOnFocus
            autoFocus
          />
        }
      </View>
      <View style={styles.response}>
        {ai.dirty && ai.response && !ai.loading &&
          <Markdown text={ai.response[1]}/>
        }
        {ai.loading &&
          <PageLoading indicator={{size: 'small'}}/>
        }
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
    fontWeight: '100',
    fontFamily: theme.font.family,
    fontSize: theme.font.headerSize,
    letterSpacing: theme.font.headerSpacing,
    color: theme.colors.foreground,
  },
  weather: {
    fontWeight: '100',
    fontFamily: theme.font.family,
    fontSize: theme.font.contentSize,
    letterSpacing: theme.font.contentSpacing,
    color: theme.colors.foreground,
    alignSelf: 'flex-end',
  },
  ai: {
    flex: 1,
    gap: theme.display.space5,
    alignItems: 'center',
  },
  response: {
    gap: theme.display.space5,
    alignItems: 'center',
  },
  prompt: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.display.radius3,
    paddingHorizontal: theme.display.space4,
    paddingVertical: theme.display.space2,
    backgroundColor: theme.colors.input,
    fontFamily: theme.font.family,
    fontSize: theme.font.inputSize,
    fontWeight: theme.font.inputWeight,
    lineHeight: theme.font.inputHeight,
    letterSpacing: theme.font.inputSpacing,
    color: theme.colors.foreground,
    width: '100%',
  },
  archive: {
    width: '100%',
  },
  timestamp: {
    position: 'absolute',
    right: 6,
    top: 7,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.display.space2,
    paddingVertical: theme.display.space1,
    borderRadius: theme.display.radius2,
    fontSize: theme.font.size,
    fontFamily: theme.font.family,
    fontWeight: theme.font.weight,
    lineHeight: theme.font.height,
    letterSpacing: theme.font.spacing,
    color: theme.colors.mutedForeground,
  },
}));
