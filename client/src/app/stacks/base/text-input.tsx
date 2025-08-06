import {StyleSheet, withUnistyles} from 'react-native-unistyles';
import {TextInput as RNTextInput, View} from 'react-native';

import type {TextInputProps} from 'react-native';

export const TextInput = withUnistyles(RNTextInput, (theme) => ({
  placeholderTextColor: theme.colors.mutedForeground,
}));

export const TextInputAvoidKeyboard = (props: TextInputProps) => (
  <View style={styles.root}>
    <TextInput {...props}/>
  </View>
);

const styles = StyleSheet.create((_theme, rt) => ({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: rt.insets.top,
    transform: [{translateY: rt.insets.ime * -1}],
  },
}));
