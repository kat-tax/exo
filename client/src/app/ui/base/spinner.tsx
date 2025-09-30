import {StyleSheet, withUnistyles} from 'react-native-unistyles';
import {ActivityIndicator as RNActivityIndicator, View} from 'react-native';

import type {ActivityIndicatorProps} from 'react-native';

export const ActivityIndicator = withUnistyles(RNActivityIndicator, (theme) => ({
  color: theme.colors.foreground,
}));

export const Spinner = (props: ActivityIndicatorProps) => (
  <View style={styles.root}>
    <ActivityIndicator size="large" {...props}/>
  </View>
);

const styles = StyleSheet.create(() => ({
  root: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
