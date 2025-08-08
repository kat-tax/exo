import {View} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';

interface GridProps extends React.PropsWithChildren {}

export function Grid(props: GridProps) {
  return (
    <View style={styles.root}>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    margin: -theme.display.space1,
  },
}));
