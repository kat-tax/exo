import {StyleSheet, withUnistyles} from 'react-native-unistyles';
import {ActivityIndicator as RNActivityIndicator, View} from 'react-native';

export const ActivityIndicator = withUnistyles(RNActivityIndicator, (theme) => ({
  color: theme.colors.neutral,
}));

export const Spinner = () => (
  <View style={styles.root}>
    <ActivityIndicator size="large"/>
  </View>
);

const styles = StyleSheet.create(() => ({
  root: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
