import {View, ScrollView, Text} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {Link} from '@react-navigation/native';
import {Icon} from 'react-exo/icon';

import type {RootStackParamList} from 'app/nav';

export interface PanelProps extends React.PropsWithChildren {
  title?: string | React.ReactNode,
  message?: string | React.ReactNode,
  right?: React.ReactNode,
  back?: keyof RootStackParamList,
}

export function Panel(props: PanelProps) {
  const hasTitle = Boolean(props.title);
  const hasMessage = Boolean(props.message);
  const hasHeader = (hasTitle || hasMessage || props.right);

  return (
    <View style={styles.root}>
      <ScrollView style={styles.scroll}>
        <View style={styles.content}>
          {hasHeader &&
            <View style={styles.header}>
              {(hasTitle || hasMessage) &&
                <View style={styles.greeting}>
                  {hasTitle &&
                    <View style={styles.titlebar}>
                      {props.back &&
                        <View style={styles.back}>
                          <Link screen={props.back} params={{}}>
                            <Icon name="ph:arrow-left" size={28}/>
                          </Link>
                        </View>
                      }
                      <Text
                        style={styles.title}
                        selectable={false}
                        ellipsizeMode="tail"
                        numberOfLines={1}>
                        {props.title}
                      </Text>
                    </View>
                  }
                  {hasMessage &&
                    <Text
                      style={styles.message}
                      selectable={false}
                      ellipsizeMode="tail"
                      numberOfLines={3}>
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

const styles = StyleSheet.create((theme, rt) => ({
  root: {
    flex: 1,
    backgroundColor: {
      initial: theme.colors.card,
      xs: 'transparent',
    },
    paddingTop: {
      initial: rt.insets.top / 2,
      xs: 0,
    },
  },
  scroll: {
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    _web: {
      borderWidth: {
        initial: 0,
        xs: StyleSheet.hairlineWidth,
      },
      borderRadius: {
        initial: 0,
        xs: theme.display.radius2,
      },
      marginHorizontal: {
        initial: 0,
        xs: theme.display.space2,
      },
      marginBottom: {
        initial: 0,
        xs: theme.display.space2,
      },
    }
  },
  content: {
    flex: 1,
    alignSelf: 'center',
    maxWidth: '100%',
    paddingVertical: theme.display.space5,
    paddingHorizontal: {
      initial: theme.display.space5,
      md: 0,
    },
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
    marginBottom: theme.display.space5,
  },
  back: {
    marginTop: 2,
  },
  widget: {
    gap: theme.display.space2,
  },
  widgetRight: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  greeting: {
    gap: theme.display.space2,
    flex: 1,
  },
  titlebar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.display.space3,
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
