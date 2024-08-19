import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useWindowDimensions, View, ScrollView, Text} from 'react-native';

export interface PageProps extends React.PropsWithChildren {
  title?: string | React.ReactNode,
  message?: string | React.ReactNode,
  widget?: React.ReactNode,
  hasPreview?: boolean,
  fullWidth?: boolean,
  noMargin?: boolean,
  sxs?: boolean,
}

export function Page(props: PageProps) {
  const {styles, theme} = useStyles(stylesheet);
  const screen = useWindowDimensions();
  const hasTitle = Boolean(props.title);
  const hasMessage = Boolean(props.message);
  const hasHeader = hasTitle || hasMessage;
  const hasNoFrame = screen.width < theme.breakpoints.xs;
  const vstyles = {
    root: [
      styles.root,
      hasNoFrame && styles.noframe,
      props.hasPreview && styles.withPreview,
    ],
    content: [
      styles.content,
      props.fullWidth && styles.contentFull,
      !props.noMargin && styles.contentSpacing,
    ],
  };

  return (
    <ScrollView style={vstyles.root} contentContainerStyle={{flex: 1}}>
      <View style={vstyles.content}>
        {hasHeader &&
          <View style={styles.header}>
            <View style={styles.greeting}>
              {hasTitle &&
                <Text style={styles.title}>
                  {props.title}
                </Text>
              }
              {hasMessage &&
                <Text style={styles.message}>
                  {props.message}
                </Text>
              }
            </View>
            {props.widget}
          </View>
        }
        {props.children}
      </View>
    </ScrollView>
  );
}

const stylesheet = createStyleSheet((theme, rt) => ({
  root: {
    margin: theme.display.space2,
    borderWidth: rt.hairlineWidth,
    borderRadius: theme.display.radius2,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
  },
  withPreview: {
    marginRight: 0,
  },
  noframe: {
    margin: 0,
    borderWidth: 0,
    borderRadius: 0,
    borderTopWidth: rt.hairlineWidth,
  },
  content: {
    flex: 1,
    alignSelf: 'center',
    gap: theme.display.space5,
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
  contentSpacing: {
    padding: theme.display.space5,
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
