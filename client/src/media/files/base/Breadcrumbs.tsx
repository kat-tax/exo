import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {View, Text} from 'react-native';

interface Breadcrumbs {
  items?: string[];
}

export function Breadcrumbs(_props: Breadcrumbs) {
  const {styles} = useStyles(stylesheet);
  return (
    <View style={styles.root}>
      <Text>Breadcrumbs</Text>
    </View>
  );
}

const stylesheet = createStyleSheet(() => ({
  root: {
    // ...
  },
}));
