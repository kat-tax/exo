import {useStyles, createStyleSheet} from 'styles';
import {View} from 'react-native';

export interface PlaceholderProps {
  testID?: string,
}

export function Placeholder(props: PlaceholderProps) {
  const {styles, theme} = useStyles(stylesheet);

  return (
    <View style={styles.root} testID={props.testID}>
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

