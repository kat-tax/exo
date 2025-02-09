import {View} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';

interface MediaAddProps {
  path: string,
}

export function MediaAdd(props: MediaAddProps) {
  const {styles} = useStyles(stylesheet);

  return (
    <View style={styles.root}>
    </View>
  );
}

const stylesheet = createStyleSheet((theme, rt) => ({
  root: {
    flex: 2,
    backgroundColor: theme.colors.neutral,
  },
}));
