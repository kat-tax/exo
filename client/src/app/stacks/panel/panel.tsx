import {useWindowDimensions, View, ScrollView, Text} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useApp} from 'app/hooks/use-app';

export interface PanelProps extends React.PropsWithChildren {
  title?: string | React.ReactNode,
  message?: string | React.ReactNode,
  widget?: React.ReactNode,
  margin?: 'none' | 'small' | 'large',
  transparent?: boolean,
  noframe?: boolean,
  center?: boolean,
  fluid?: boolean,
}

export function Panel(props: PanelProps) {
  const {styles, theme} = useStyles(stylesheet);
  const {layout} = useApp();
  const screen = useWindowDimensions();
  const margin = props.margin ?? 'large';
  const hasTitle = Boolean(props.title);
  const hasMessage = Boolean(props.message);
  const hasHeader = hasTitle || hasMessage;
  const hasNoFrame = props.noframe || screen.width < theme.breakpoints.sm;
  const vstyles = {
    root: [
      styles.root,
      hasNoFrame && styles.frameless,
      props.transparent && styles.transparent,
      layout?.hasPreviewPanel && styles.paneled,
    ],
    content: [
      styles.content,
      props.fluid && styles.contentFull,
      props.center && styles.contentCenter,
      margin === 'large' && styles.contentSpacing,
      margin === 'small' && styles.contentSpacingSmall,
    ],
    header: [
      styles.header,
      props.fluid && styles.headerAlign,
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
                  <Text
                    style={styles.title}
                    selectable={false}
                    ellipsizeMode="tail"
                    numberOfLines={1}>
                    {props.title}
                  </Text>
                }
                {hasMessage &&
                  <Text
                    style={styles.message}
                    selectable={false}
                    ellipsizeMode="tail"
                    numberOfLines={1}>
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
  paneled: {
    marginRight: 0,
  },
  frameless: {
    margin: 0,
    borderWidth: 0,
    borderRadius: 0,
    borderTopWidth: rt.hairlineWidth,
  },
  transparent: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderWidth: 0,
  },
  content: {
    flex: 1,
    alignSelf: 'center',
    maxWidth: '100%',
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
  contentCenter: {
    justifyContent: 'center',
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
    flex: 1,
  },
  header: {
    overflow: 'hidden',
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
