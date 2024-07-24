import {View, ScrollView, Text} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';

export interface PageProps extends React.PropsWithChildren {
  title?: string | React.ReactNode,
  message?: string | React.ReactNode,
  widget?: React.ReactNode,
  fullWidth?: boolean,
}

export function Page(props: PageProps) {
  const {styles} = useStyles(stylesheet);
  return (
    <ScrollView>
      <View style={[styles.root, props.fullWidth && styles.rootFull]}>
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
    width: {
      initial: '100%',
      md: 640, // 480p
      lg: 900, // HD+
      xl: 1280, // 720p
      xxxl: 1920, // 1080p
      xxxxl: 2560, // 2K
      xxxxxl: 3840, // 4K
    },
  },
  rootFull: {
    width: '100%',
  },
  greeting: {
    gap: theme.display.space2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
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
    fontWeight: '300',
    fontFamily: theme.font.family,
    fontSize: theme.font.contentSize,
    letterSpacing: theme.font.contentSpacing,
    color: theme.colors.mutedForeground,
  },
}));
