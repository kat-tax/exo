import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {View, Text} from 'react-native';

interface BarFilter {
  items?: string[];
}

export function BarFilter(_props: BarFilter) {
  const {styles} = useStyles(stylesheet);
  return (
    <View style={styles.root}>
      <Text>BarFilter</Text>
    </View>
  );
}

const stylesheet = createStyleSheet(() => ({
  root: {
    // ...
  },
}));
