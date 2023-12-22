import {View, Text} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';

export function App() {
  const {styles} = useStyles(stylesheet);
  return (
    <View style={styles.root}>
      <View style={styles.content}>
        <Text style={styles.greeting}>
          Hello, World!
        </Text>
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    margin: 20,
  },
  greeting: {
    color: theme.colors.foreground,
  },
}));
