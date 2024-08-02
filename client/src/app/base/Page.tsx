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
    <ScrollView style={styles.root} contentContainerStyle={{flex: 1}}>
      <View style={[styles.content, props.fullWidth && styles.contentFull]}>
        <View style={styles.header}>
          <View style={styles.greeting}>
            {Boolean(props.title) &&
              <Text style={styles.title}>
                {props.title}
              </Text>
            }
            {Boolean(props.message) &&
              <Text style={styles.message}>
                {props.message}
              </Text>
            }
          </View>
          {props.widget}
        </View>
        {props.children}
      </View>
    </ScrollView>
  );
}

const stylesheet = createStyleSheet((theme, rt) => ({
  root: {
    margin: theme.display.space2,
    borderWidth: rt.hairlineWidth,
    borderColor: theme.colors.border,
    borderRadius: theme.display.radius2,
    backgroundColor: theme.colors.card,
  },
  content: {
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
  contentFull: {
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
