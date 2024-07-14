import {View, ScrollView, Text} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';

export interface PageProps {
  title?: string | React.ReactNode,
  message?: string | React.ReactNode,
  children?: React.ReactNode,
  widget?: React.ReactNode,
  fullWidth?: boolean,
}

export function Page(props: PageProps) {
  const {styles} = useStyles(stylesheet);
  return (
    <ScrollView>
      <View style={[styles.root, props.fullWidth && styles.rootFullWidth]}>
        <View style={styles.header}>
          <View style={styles.greeting}>
            {props.title &&
              <Text style={styles.title}>
                {props.title}
              </Text>
            }
            {props.message &&
              <Text style={styles.message}>
                {props.message}
              </Text>
            }
          </View>
          {props.widget &&
            <View>
              {props.widget}
            </View>
          }
        </View>
        {props.children}
      </View>
    </ScrollView>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    flex: 1,
    alignSelf: 'center',
    gap: theme.display.space5,
    padding: theme.display.space5,
    minWidth: {
      initial: '100%',
      md: 900,
      xl: 1200,
    },
    maxWidth: {
      initial: '100%',
      md: 900,
      xl: 1200,
    },
  },
  rootFullWidth: {
    maxWidth: '100%',
  },
  greeting: {
    gap: theme.display.space2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: theme.display.space5,
    marginBottom: theme.display.space3,
  },
  title: {
    fontFamily: theme.font.family,
    fontSize: theme.font.headerSize,
    fontWeight: theme.font.headerWeight,
    letterSpacing: theme.font.headerSpacing,
    color: theme.colors.foreground,
  },
  message: {
    fontFamily: theme.font.family,
    fontSize: theme.font.contentSize,
    fontWeight: theme.font.contentWeight,
    letterSpacing: theme.font.contentSpacing,
    color: theme.colors.mutedForeground,
  },
}));
