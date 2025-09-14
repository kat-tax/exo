import {StyleSheet} from 'react-native-unistyles';
import {View} from 'react-native';

import type {ViewStyle, StyleProp} from 'react-native';

export interface PlaceholderProps {
  /** Used to override the default root style. */
  style?: StyleProp<ViewStyle>,
  /** Used to locate this view in end-to-end tests. */
  testID?: string,
}

export function Placeholder(props: PlaceholderProps) {
  return (
    <View testID={props.testID ?? "2237:443"} style={[styles.root, props.style]}>
    </View>
  );
}

const styles = StyleSheet.create(theme => ({
  root: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    alignSelf: 'stretch',
    opacity: 0.3,
    backgroundColor: 'lightgray',
  },
}));
