import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useVariants, createIcon} from 'react-exo/utils';
import {View, Text} from 'react-native';

export interface AlertProps {
  /** Main content text of the alert. */
  body: string,
  /** Header text of the alert. */
  header: string,
  /** Visual mode of the alert. */
  mode: typeof AlertVariants.mode[number],
  /** Whether the icon should be displayed. */
  hasIcon?: boolean,
  /** Optional icon element to display. */
  icon?: JSX.Element,
  /** Used to locate this view in end-to-end tests. */
  testID?: string,
}

export const AlertVariants = {
  mode: ['Default', 'Destructive'],
} as const;

/**
 * A component that renders an alert with configurable properties.
 */
export function Alert(props: AlertProps) {
  const {mode} = props;
  const {styles} = useStyles(stylesheet);
  const {vstyles} = useVariants(AlertVariants, {mode}, styles);

  return (
    <View style={vstyles.root()} testID={props.testID ?? "5290:611"}>
      {props.hasIcon && 
        <View style={vstyles.icon()} testID="5290:613">
          {createIcon(props.icon, vstyles.phPlaceholder())}
        </View>
      }
      <View style={vstyles.contents()} testID="5290:615">
        <Text style={vstyles.header()} testID="5290:616">
          {props.header}
        </Text>
        <Text style={vstyles.body()} testID="5290:617">
          {props.body}
        </Text>
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    flexDirection: 'row',
    width: 378,
    padding: theme.display.space4,
    alignItems: 'flex-start',
    gap: theme.display.space4,
    borderRadius: theme.display.radius3,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
  },
  rootModeDestructive: {
    borderColor: theme.colors.destructive,
  },
  icon: {
    width: 20,
    height: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
    flexShrink: 0,
  },
  header: {
    color: theme.colors.cardForeground,
    fontFamily: theme.font.family,
    fontSize: theme.font.labelSize,
    fontStyle: 'normal',
    fontWeight: theme.font.labelWeight,
    lineHeight: 20,
  },
  body: {
    color: theme.colors.cardForeground,
    fontFamily: theme.font.family,
    fontSize: theme.font.size,
    fontStyle: 'normal',
    fontWeight: theme.font.weight,
    lineHeight: theme.font.contentHeight,
    letterSpacing: theme.font.contentSpacing,
  },
  contents: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.display.space1,
  },
  phPlaceholder: {
    color: theme.colors.foreground,
    size: 20,
  },
  phPlaceholderModeDestructive: {
    color: theme.colors.destructive,
  },
}));
