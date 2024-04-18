import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {View, Text} from 'react-native';

export interface CardProps {
  /** The card header */
  header: string,
  /** The card thumbnail */
  thumbnail?: JSX.Element,
  /** An identifier used for testing */
  testID?: string,
}

/**
 * A simple card block component
 * */
export function Card(props: CardProps) {
  const {styles} = useStyles(stylesheet);

  return (
    <View style={styles.root} testID={props.testID ?? "2218:99"}>
      {props.thumbnail}
      <View style={styles.contents} testID="2218:101">
        <Text style={styles.header} testID="2218:102">
          {`Header`}
        </Text>
        <Text style={styles.body} testID="2218:103">
          {`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...`}
        </Text>
        <Text style={styles.footer} testID="2218:116">
          {`Footer`}
        </Text>
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'flex-start',
    rowGap: 16,
    columnGap: 16,
    alignSelf: 'stretch',
    borderRadius: 6,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.popover,
  },
  header: {
    color: theme.colors.cardForeground,
    fontFamily: 'Inter',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 20,
  },
  body: {
    alignSelf: 'stretch',
    color: theme.colors.cardForeground,
    fontFamily: 'Inter',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
  },
  footer: {
    alignSelf: 'stretch',
    color: theme.colors.mutedForeground,
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 16,
  },
  contents: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: 4,
    columnGap: 4,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    alignSelf: 'stretch',
  },
}));
