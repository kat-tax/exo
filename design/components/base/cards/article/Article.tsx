import {StyleSheet} from 'react-native-unistyles';
import {View, Text} from 'react-native';

import type {ViewStyle, StyleProp} from 'react-native';

export interface ArticleProps {
  /** The main content text of the article. */
  body: string,
  /** The footer text of the article. */
  footer: string,
  /** The header text of the article. */
  header: string,
  /** Whether the footer should be displayed. */
  hasFooter?: boolean,
  /** Whether tags should be displayed. */
  hasTags?: boolean,
  /** Whether a thumbnail should be displayed. */
  hasThumbnail?: boolean,
  /** Optional element representing tags. */
  tags?: React.ReactElement,
  /** Optional element representing a thumbnail. */
  thumbnail?: React.ReactElement,
  /** Used to override the default root style. */
  style?: StyleProp<ViewStyle>,
  /** Used to locate this view in end-to-end tests. */
  testID?: string,
}

/**
 * A component that renders an article layout with optional thumbnail, tags, and footer.
 */
export function Article(props: ArticleProps) {
  return (
    <View testID={props.testID ?? "2218:99"} style={[styles.root, props.style]}>
      {props.hasThumbnail && 
        <View testID="5234:214" style={styles.thumbnail}>
          {props.thumbnail}
        </View>
      }
      <View testID="2218:101" style={styles.contents}>
        <Text testID="2218:102" style={styles.header}>
          {props.header}
        </Text>
        {props.hasTags && 
          <View testID="5283:474" style={styles.tags}>
            {props.tags}
          </View>
        }
        <Text testID="2218:103" style={styles.body}>
          {props.body}
        </Text>
        {props.hasFooter && 
          <Text testID="2218:116" style={styles.footer}>
            {props.footer}
          </Text>
        }
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
  thumbnail: {
    minWidth: 90,
    minHeight: 90,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  header: {
    color: theme.colors.cardForeground,
    fontFamily: theme.font.family,
    fontSize: theme.font.titleSize,
    fontStyle: 'normal',
    fontWeight: theme.font.titleWeight,
    lineHeight: theme.font.titleHeight,
    letterSpacing: theme.font.titleSpacing,
  },
  contents: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.display.space1,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
  },
  tags: {
    minHeight: 22,
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
  },
  body: {
    alignSelf: 'stretch',
    color: theme.colors.cardForeground,
    fontFamily: theme.font.family,
    fontSize: theme.font.contentSize,
    fontStyle: 'normal',
    fontWeight: theme.font.contentWeight,
    lineHeight: theme.font.contentHeight,
    letterSpacing: theme.font.contentSpacing,
  },
  footer: {
    alignSelf: 'stretch',
    color: theme.colors.mutedForeground,
    fontFamily: theme.font.family,
    fontSize: theme.font.size,
    fontStyle: 'normal',
    fontWeight: theme.font.weight,
    lineHeight: theme.font.height,
    letterSpacing: theme.font.spacing,
  },
}));
