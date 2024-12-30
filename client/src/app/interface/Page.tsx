import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useWindowDimensions, View, ScrollView, Text} from 'react-native';

export interface PageProps extends React.PropsWithChildren {
  title?: string | React.ReactNode,
  message?: string | React.ReactNode,
  widget?: React.ReactNode,
  hasPanel?: boolean,
  fullWidth?: boolean,
  noBackground?: boolean,
  noFrame?: boolean,
  margin?: 'none' | 'small' | 'large',
  sxs?: boolean,
}

export function Page(props: PageProps) {
  const {styles, theme} = useStyles(stylesheet);
  const screen = useWindowDimensions();
  const margin = props.margin ?? 'large';
  const hasTitle = Boolean(props.title);
  const hasMessage = Boolean(props.message);
  const hasHeader = hasTitle || hasMessage;
  const hasNoFrame = props.noFrame || screen.width < theme.breakpoints.xs;
  const vstyles = {
    root: [
      styles.root,
      hasNoFrame && styles.noFrame,
      props.hasPanel && styles.withPanel,
      props.noBackground && styles.noBackground,
    ],
    content: [
      styles.content,
      props.fullWidth && styles.contentFull,
      margin === 'large' && styles.contentSpacing,
      margin === 'small' && styles.contentSpacingSmall,
    ],
    header: [
      styles.header,
      props.fullWidth && styles.headerAlign,
    ],
  };

  return (
    <View style={styles.base}>
      <ScrollView style={vstyles.root} contentContainerStyle={{flex: 1}}>
        <View style={vstyles.content}>
          {hasHeader &&
            <View style={vstyles.header}>
              <View style={styles.greeting}>
                {hasTitle &&
                  <Text style={styles.title} selectable={false}>
                    {props.title}
                  </Text>
                }
                {hasMessage &&
                  <Text style={styles.message} selectable={false}>
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
    </View>
  );
}

const stylesheet = createStyleSheet((theme, rt) => ({
  base: {
    flex: 1,
  },
  root: {
    margin: theme.display.space2,
    borderWidth: rt.hairlineWidth,
    borderRadius: theme.display.radius2,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
  },
  withPanel: {
    marginRight: 0,
  },
  noFrame: {
    margin: 0,
    borderWidth: 0,
    borderRadius: 0,
    borderTopWidth: rt.hairlineWidth,
  },
  noBackground: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderWidth: 0,
  },
  content: {
    flex: 1,
    alignSelf: 'center',
    gap: theme.display.space1,
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
  contentSpacingSmall: {
    padding: theme.display.space2,
  },
  greeting: {
    gap: theme.display.space2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: theme.display.space2,
    marginBottom: theme.display.space3,
  },
  headerAlign: {
    marginLeft: theme.display.space2,
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
