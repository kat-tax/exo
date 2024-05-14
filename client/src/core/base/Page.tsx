import {View, Text} from 'react-native';
import {useStyles, createStyleSheet} from 'design/styles';

export interface PageProps {
  title?: string | React.ReactNode,
  children?: React.ReactNode,
}

export function Page(props: PageProps) {
  const {styles} = useStyles(stylesheet);
  return (
    <View style={styles.root}>
      {props.title &&
        <Text style={styles.header}>
          {props.title}
        </Text>
      }
      <View>
        {props.children}
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    flex: 1,
    gap: 24,
    padding: 24,
    backgroundColor: theme.colors.background,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.foreground,
  },
}));
