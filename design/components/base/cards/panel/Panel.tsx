import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {View, Text} from 'react-native';
import {Placeholder} from 'components/base/utilities/placeholder';

export interface PanelProps {
  header: string,
  message: string,
  /** Used to locate this view in end-to-end tests. */
  testID?: string,
}

/**
 * A component that renders a panel with a header, content, and footer section.
 */
export function Panel(props: PanelProps) {
  const {styles} = useStyles(stylesheet);

  return (
    <View style={styles.root} testID={props.testID ?? "5290:674"}>
      <View style={styles.contents} testID="5290:668">
        <View style={styles.title} testID="5525:470">
          <Text style={styles.header} testID="5290:669">
            {props.header}
          </Text>
          <Text style={styles.description} testID="5290:672">
            {props.message}
          </Text>
        </View>
        <View style={styles.content} testID="5290:670">
          <Placeholder testID="5290:671"/>
        </View>
        <View style={styles.footer} testID="5290:675">
          <Placeholder testID="5290:676"/>
        </View>
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
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
    color: theme.colors.cardForeground,
    fontFamily: theme.font.family,
    fontSize: theme.font.titleSize,
    fontStyle: 'normal',
    fontWeight: theme.font.titleWeight,
    lineHeight: theme.font.titleHeight,
    letterSpacing: theme.font.titleSpacing,
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
