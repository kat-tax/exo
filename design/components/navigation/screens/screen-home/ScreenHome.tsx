import {StyleSheet} from 'react-native-unistyles';
import {View} from 'react-native';

import type {ViewStyle, StyleProp} from 'react-native';

export interface ScreenHomeProps {
  /** Used to override the default root style. */
  style?: StyleProp<ViewStyle>,
  /** Used to locate this view in end-to-end tests. */
  testID?: string,
}

export function ScreenHome(props: ScreenHomeProps) {
  return (
    <View testID={props.testID ?? "4562:99"} style={[styles.root, props.style]}>
    </View>
  );
}

const styles = StyleSheet.create(theme => ({
  root: {
    width: 1280,
    height: 832,
    padding: theme.display.space7,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.display.space7,
    backgroundColor: theme.colors.background,
  },
}));
