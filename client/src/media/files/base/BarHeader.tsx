import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {View, Text} from 'react-native';

interface BarHeader {
  items?: string[];
}

export function BarHeader(_props: BarHeader) {
  const {styles} = useStyles(stylesheet);
  return (
    <View style={styles.root}>
      <Text>BarHeader</Text>
    </View>
  );
}

const stylesheet = createStyleSheet(() => ({
  root: {
    // ...
  },
}));
