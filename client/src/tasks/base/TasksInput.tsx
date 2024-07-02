import {t} from '@lingui/macro';
import {useRef} from 'react';
import {useLingui} from '@lingui/react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {TextInput} from 'react-native';

interface TasksInputProps {
  onSubmit: (input: string) => void;
}

export function TasksInput(props: TasksInputProps) {
  const {styles, theme} = useStyles(stylesheet);
  const refInput = useRef<any>(null);
  useLingui();
  return (
    <TextInput
      autoFocus
      ref={refInput}
      style={styles.input}
      blurOnSubmit={false}
      placeholder={t`Add a task`}
      placeholderTextColor={theme.colors.mutedForeground}
      onSubmitEditing={e => {
        const input = e.nativeEvent.text;
        if (input) {
          props.onSubmit(input);
          refInput.current?.clear();
        }
      }}
    />
  );
}

const stylesheet = createStyleSheet(theme => ({
  input: {
    width: 300,
    padding: 8,
    marginTop: 16,
    color: theme.colors.foreground,
  },
}));
