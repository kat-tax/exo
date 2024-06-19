import {View, ScrollView, Text} from 'react-native';
import {useStyles, createStyleSheet} from 'design/styles';

export interface PageProps {
  title?: string | React.ReactNode,
  children?: React.ReactNode,
}

export function Page(props: PageProps) {
  const {styles} = useStyles(stylesheet);
  return (
    <ScrollView>
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
    </ScrollView>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    flex: 1,
    maxWidth: 980,
    gap: theme.display.space5,
    padding: theme.display.space5,
    backgroundColor: theme.colors.background,
  },
  header: {
    fontSize: theme.font.headerSize,
    fontWeight: theme.font.headerWeight,
    lineHeight: theme.font.headerHeight,
    letterSpacing: theme.font.headerSpacing,
    color: theme.colors.foreground,
  },
}));
