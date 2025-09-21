import {useVariants} from 'react-exo/utils';
import {StyleSheet} from 'react-native-unistyles';
import {View, Text} from 'react-native';
import {Icon} from 'react-exo/icon';

import type {ViewStyle, StyleProp} from 'react-native';

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
  icon?: React.ReactElement,
  /** Used to override the default root style. */
  style?: StyleProp<ViewStyle>,
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
  const {vstyles} = useVariants(AlertVariants, {mode}, styles);

  return (
    <View testID={props.testID ?? "5290:611"} style={[vstyles.root(), props.style]}>
      {props.hasIcon && 
        <View testID="5290:613" style={vstyles.status()}>
          {Icon.New(props.icon, vstyles.icon())}
        </View>
      }
      <View testID="5290:615" style={vstyles.contents()}>
        <Text testID="5290:616"
          style={vstyles.header()}
          selectable>
          {props.header}
        </Text>
        <Text testID="5290:617" style={vstyles.body()}>
          {props.body}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create(theme => ({
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
  status: {
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
  icon: {
    color: theme.colors.foreground,
    size: 20,
  },
  iconModeDestructive: {
    color: theme.colors.destructive,
  },
}));
