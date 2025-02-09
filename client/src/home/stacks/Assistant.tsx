import {useLingui} from '@lingui/react/macro';
import {useRef, useState, useMemo, memo} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useAppContext} from 'app/hooks/use-app-context';

import {Text, View, TextInput, Pressable} from 'react-native';
import {Link} from 'react-exo/navigation';
import {Icon} from 'react-exo/icon';

import {Spinner} from 'app/stacks/load';
import {Markdown} from 'app/stacks/markdown';
import {formatDate} from 'home/utils/time';
import {useAI} from 'home/hooks/use-ai';

const DEFAULT_MODEL = 'llama3-8b-8192';

export const Assistant = memo(() => {
  const {profile} = useAppContext();
  const {styles, theme} = useStyles(stylesheet);
  const {t} = useLingui();

  const [multiline, setMultiline] = useState(false);
  const keyRef = useRef<TextInput>(null);
  const keyVal = useMemo(() => profile?.groqKey || '', [profile]);
  const model = useMemo(() => profile?.groqModel || DEFAULT_MODEL, [profile]);
  const ai = useAI(keyRef, model, keyVal);

  return (
    <>
      <View style={styles.prompt}>
        {ai.archive &&
          <View style={styles.wrapper}>
            <TextInput
              style={styles.input}
              value={ai.response?.prompt ?? ''}
              multiline={Boolean(ai.response?.isMultiline)}
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
              ref={keyRef}
              style={styles.input}
              placeholder={keyVal ? t`Ask anything...` : t`Please set your Groq API Key`}
              placeholderTextColor={theme.colors.mutedForeground}
              onSubmitEditing={(e) => e.nativeEvent.text && ai.promptText(e.nativeEvent.text, multiline)}
              onKeyPress={(e) => ai.navigate(e, multiline ? () => setMultiline(false) : undefined)}
              blurOnSubmit={false}
              multiline={multiline}
              numberOfLines={multiline ? 8 : undefined}
              readOnly={!keyVal}
              autoFocus
            />
            {!keyVal &&
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
            {Boolean(keyVal) &&
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
                  const text = keyRef.current?.value;
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
          <Spinner size="small"/>
        }
      </View>
    </>
  );
});

const stylesheet = createStyleSheet(theme => ({
  prompt: {
    marginTop: theme.display.space5,
    alignItems: 'center',
    gap: theme.display.space5,
  },
  response: {
    alignItems: 'center',
    marginTop: theme.display.space4,
    gap: theme.display.space5,
  },
  input: {
    flex: 1,
    width: '100%',
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
  },
  wrapper: {
    width: '100%',
  },
  timestamp: {
    top: 7,
    right: 6,
    position: 'absolute',
    paddingHorizontal: theme.display.space2,
    paddingVertical: theme.display.space1,
    borderRadius: theme.display.radius2,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    fontSize: theme.font.size,
    fontFamily: theme.font.family,
    fontWeight: theme.font.weight,
    lineHeight: theme.font.height,
    letterSpacing: theme.font.spacing,
    color: 'rgb(255, 255, 255)',
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
