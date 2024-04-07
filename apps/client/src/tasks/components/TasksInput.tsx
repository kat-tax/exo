import {t} from '@lingui/macro';
import {useRef} from 'react';
import {useLingui} from '@lingui/react';
import {useStyles, createStyleSheet} from 'styles';
import {TextInput} from 'react-native';

interface TasksInputProps {
  onSubmit: (input: string) => void;
}

export function TasksInput(props: TasksInputProps) {
  const {styles} = useStyles(stylesheet);
  const refInput = useRef<any>(null);
  useLingui();
  return (
    <TextInput
      autoFocus
      ref={refInput}
      style={styles.input}
      placeholderTextColor="rgba(255, 255, 255, 0.5)"
      placeholder={t`Add a task`}
      blurOnSubmit={false}
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

const stylesheet = createStyleSheet(_theme => ({
  input: {
    width: '100%',
    padding: 12,
    color: '#000',
    borderColor: '#000',
    borderWidth: 1,
  },
}));
