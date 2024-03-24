import {StyleSheet, View, ActivityIndicator} from 'react-native';

export function Loading() {
  return (
    <View style={styles.root}>
      <ActivityIndicator size="large"/>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
});
