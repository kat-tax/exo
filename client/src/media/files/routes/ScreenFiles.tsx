import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {View, Text} from 'react-native';

export default function ScreenFiles() {
  const {styles} = useStyles(stylesheet);

  return (
    <View style={styles.root}>
      <Text>Files</Text>
    </View>
  );
}

const stylesheet = createStyleSheet(() => ({
  root: {
    flex: 1,
  },
}));
