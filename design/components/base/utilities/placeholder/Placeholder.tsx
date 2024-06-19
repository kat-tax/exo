import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {View} from 'react-native';

export interface PlaceholderProps {
  /** Used to locate this view in end-to-end tests. */
  testID?: string,
}

export function Placeholder(props: PlaceholderProps) {
  const {styles} = useStyles(stylesheet);

  return (
    <View style={styles.root} testID={props.testID ?? "2237:443"}>
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    alignSelf: 'stretch',
    backgroundColor: theme.colors.input,
  },
}));
