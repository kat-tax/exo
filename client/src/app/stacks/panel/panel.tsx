import {View, ScrollView, Text} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';

export interface PanelProps extends React.PropsWithChildren {
  title?: string | React.ReactNode,
  message?: string | React.ReactNode,
  right?: React.ReactNode,
  left?: React.ReactNode,
}

export function Panel(props: PanelProps) {
  const hasTitle = Boolean(props.title);
  const hasMessage = Boolean(props.message);
  const hasHeader = hasTitle || hasMessage || props.right || props.left;

  return (
    <View style={styles.root}>
      <ScrollView style={styles.scroll} contentContainerStyle={{flex: 1}}>
        <View style={styles.content}>
          {hasHeader &&
            <View style={styles.header}>
              {props.left &&
                <View style={[styles.widget, styles.widgetLeft]}>
                  {props.left}
                </View>
              }
              {(hasTitle || hasMessage) &&
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
              }
              {props.right &&
                <View style={[styles.widget, styles.widgetRight]}>
                  {props.right}
                </View>
              }
            </View>
          }
          {props.children}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
  },
  scroll: {
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: {
      initial: 0,
      xs: theme.display.radius2,
    },
    margin: {
      initial: 0,
      xs: theme.display.space2,
    },
  },
  content: {
    flex: 1,
    alignSelf: 'center',
    padding: theme.display.space5,
    maxWidth: '100%',
    width: {
      initial: '100%',
      md: 800,
      lg: 1024,
      xl: 1280,
      xxl: 1640,
      xxxl: 1920,
      xxxxl: 2560,
      xxxxxl: 3840,
    },
  },
  header: {
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: theme.display.space1,
    marginBottom: theme.display.space6,
  },
  widget: {
    flex: 1,
    gap: theme.display.space2,
  },
  widgetLeft: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  widgetRight: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  greeting: {
    gap: theme.display.space2,
    flex: 1,
  },
  title: {
    fontFamily: theme.font.family,
    fontSize: theme.typography.size7,
    fontWeight: theme.font.headerWeight,
    letterSpacing: theme.font.headerSpacing,
    color: theme.colors.foreground,
  },
  message: {
    fontWeight: '300',
    fontFamily: theme.font.family,
    fontSize: theme.typography.size4,
    letterSpacing: theme.font.contentSpacing,
    color: theme.colors.mutedForeground,
  },
}));
