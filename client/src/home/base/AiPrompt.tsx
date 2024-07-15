import {t} from '@lingui/macro';
import {useQuery} from '@evolu/react-native';
import {useLingui} from '@lingui/react';
import {useRef, useState} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {Text, View, TextInput, Pressable} from 'react-native';
import {Link} from 'react-exo/navigation';
import {Icon} from 'react-exo/icon';
import {useAI} from 'home/hooks/useAI';
import {Markdown} from 'app/widgets/Markdown';
import {PageLoading} from 'app/base/PageLoading';
import {formatDate} from 'home/utils/time';
import {profile} from 'app/data';

const DEFAULT_MODEL = 'llama3-8b-8192';

export function AiPrompt() {
  const {row} = useQuery(profile);
  const {i18n} = useLingui();
  const {styles, theme} = useStyles(stylesheet);
  const [multiline, setMultiline] = useState(false);
  const apiKey = row?.groqKey || '';
  const model = row?.groqModel || DEFAULT_MODEL;
  const input = useRef<TextInput>(null);
  const ai = useAI(input, model, apiKey);

  return (
    <>
      <View style={styles.prompt}>
        {ai.archive &&
          <View style={styles.wrapper}>
            <TextInput
              style={styles.input}
              value={ai.response?.prompt ?? ''}
              multiline={ai.response?.isMultiline ? true : false}
              numberOfLines={ai.response?.isMultiline ? 8 : undefined}
              onKeyPress={(e) => ai.navigate(e)}
              autoFocus
              readOnly
            />
            <Text style={styles.timestamp}>
              {`${formatDate(new Date(ai.response?.createdAt ?? ''))} (${ai.response?.model ?? DEFAULT_MODEL})`}
            </Text>
          </View>
        }
        {!ai.archive &&
          <View style={styles.wrapper}>
            <TextInput
              ref={input}
              style={styles.input}
              placeholder={apiKey ? t(i18n)`Ask anything...` : t(i18n)`Please set your Groq API Key`}
              placeholderTextColor={theme.colors.mutedForeground}
              onSubmitEditing={(e) => e.nativeEvent.text && ai.promptText(e.nativeEvent.text, multiline)}
              onKeyPress={(e) => ai.navigate(e, multiline ? () => setMultiline(false) : undefined)}
              blurOnSubmit={false}
              multiline={multiline}
              numberOfLines={multiline ? 8 : undefined}
              readOnly={!apiKey}
              autoFocus
            />
            {!apiKey &&
              <View style={styles.button}>
                <Link to="/settings">
                  <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Icon
                      name="ph:gear"
                      color={theme.colors.foreground}
                      size={16}
                    />
                  </View>
                </Link>
              </View>
            }
            {apiKey &&
              <Pressable
                style={[styles.button, {top: 0}]}
                onPress={() => setMultiline(!multiline)}>
                <Icon
                  name={multiline ? 'ph:x' : 'ph:caret-up-down'}
                  color={theme.colors.foreground}
                  size={16}
                />
              </Pressable>
            }
            {multiline &&
              <Pressable
                style={[styles.button, {bottom: 0}]}
                onPress={() => {
                  // @ts-ignore
                  const text = input.current?.value;
                  if (text) ai.promptText(text, true);
                }}>
                <Icon
                  name="ph:paper-plane-right"
                  color={theme.colors.foreground}
                  size={16}
                />
              </Pressable>
            }
          </View>
        }
      </View>
      <View style={styles.response}>
        {ai.dirty && ai.response && !ai.loading &&
          <Markdown text={ai.response?.response ?? ''}/>
        }
        {ai.loading &&
          <PageLoading indicator={{size: 'small'}}/>
        }
      </View>
    </>
  );
}

const stylesheet = createStyleSheet(theme => ({
  prompt: {
    flex: 1,
    gap: theme.display.space5,
    alignItems: 'center',
  },
  response: {
    gap: theme.display.space5,
    alignItems: 'center',
  },
  input: {
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
  wrapper: {
    width: '100%',
  },
  timestamp: {
    position: 'absolute',
    right: 6,
    top: 7,
    color: 'rgb(255, 255, 255)',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: theme.display.space2,
    paddingVertical: theme.display.space1,
    borderRadius: theme.display.radius2,
    fontSize: theme.font.size,
    fontFamily: theme.font.family,
    fontWeight: theme.font.weight,
    lineHeight: theme.font.height,
    letterSpacing: theme.font.spacing,
  },
  button: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    width: 24,
    height: 24,
    margin: 7,
  },
}));
