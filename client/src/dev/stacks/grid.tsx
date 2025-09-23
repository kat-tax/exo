import {StyleSheet} from 'react-native-unistyles';
import {View} from 'react-native';

export function Grid(props: React.PropsWithChildren) {
  return (
    <View style={styles.root}>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    gap: theme.display.space3,
    flex: 1,
    flexWrap: {
      initial: 'wrap',
      lg: 'wrap',
    },
    flexDirection: {
      initial: 'column',
      lg: 'row',
    },
  },
}));
