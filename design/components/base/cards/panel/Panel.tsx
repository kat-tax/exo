import {StyleSheet} from 'react-native-unistyles';
import {View, Text} from 'react-native';

import type {ViewStyle, StyleProp} from 'react-native';

export interface PanelProps {
  header: string,
  message: string,
  content?: React.ReactElement,
  footer?: React.ReactElement,
  /** Used to override the default root style. */
  style?: StyleProp<ViewStyle>,
  /** Used to locate this view in end-to-end tests. */
  testID?: string,
}

/**
 * A component that renders a panel with a header, content, and footer section.
 */
export function Panel(props: PanelProps) {
  return (
    <View testID={props.testID ?? "5290:674"} style={[styles.root, props.style]}>
      <View testID="5290:668" style={styles.contents}>
        <View testID="5525:470" style={styles.title}>
          <Text testID="5290:669" style={styles.header}>
            {props.header}
          </Text>
          <Text testID="5290:672" style={styles.description}>
            {props.message}
          </Text>
        </View>
        <View testID="5290:670" style={styles.content}>
          {props.content}
        </View>
        <View testID="5290:675" style={styles.footer}>
          {props.footer}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create(theme => ({
  root: {
    flexDirection: 'row',
    minWidth: 270,
    minHeight: 120,
    padding: theme.display.space4,
    alignItems: 'flex-start',
    gap: theme.display.space4,
    alignSelf: 'stretch',
    borderRadius: theme.display.radius3,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
  },
  header: {
    color: theme.colors.popoverForeground,
    fontFamily: theme.font.family,
    fontSize: theme.font.headerSize,
    fontStyle: 'normal',
    fontWeight: theme.font.headerWeight,
    lineHeight: theme.font.headerHeight,
    letterSpacing: theme.font.headerSpacing,
  },
  description: {
    alignSelf: 'stretch',
    color: theme.colors.cardForeground,
    fontFamily: theme.font.family,
    fontSize: theme.font.size,
    fontStyle: 'normal',
    fontWeight: theme.font.weight,
    lineHeight: theme.font.height,
    letterSpacing: theme.font.spacing,
  },
  contents: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.display.space4,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
  },
  title: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.display.space1,
    alignSelf: 'stretch',
  },
  content: {
    minHeight: 66,
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
  },
  footer: {
    minHeight: 18,
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
  },
}));
