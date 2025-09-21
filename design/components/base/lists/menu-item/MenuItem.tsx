import {useVariants} from 'react-exo/utils';
import {StyleSheet} from 'react-native-unistyles';
import {View, Text} from 'react-native';
import {Icon} from 'react-exo/icon';

import type {ViewStyle, StyleProp} from 'react-native';

export interface MenuItemProps {
  /** Main content text of the alert. */
  body: string,
  /** Visual mode of the alert. */
  mode: typeof MenuItemVariants.mode[number],
  /** Whether the icon should be displayed. */
  hasIcon?: boolean,
  /** Optional icon element to display. */
  icon?: React.ReactElement,
  /** Used to override the default root style. */
  style?: StyleProp<ViewStyle>,
  /** Used to locate this view in end-to-end tests. */
  testID?: string,
}

export const MenuItemVariants = {
  mode: ['Default', 'Active'],
} as const;

/**
 * A component that renders an alert with configurable properties.
 */
export function MenuItem(props: MenuItemProps) {
  const {mode} = props;
  const {vstyles} = useVariants(MenuItemVariants, {mode}, styles);

  return (
    <View testID={props.testID ?? "8772:354"} style={[vstyles.root(), props.style]}>
      {props.hasIcon && 
        <View testID="8772:356" style={vstyles.status()}>
          {Icon.New(props.icon, vstyles.icon())}
        </View>
      }
      <View testID="8772:358" style={vstyles.contents()}>
        <Text testID="8772:360" style={vstyles.body()}>
          {props.body}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create(theme => ({
  root: {
    flexDirection: 'row',
    width: 200,
    paddingTop: 0,
    paddingLeft: theme.display.space2,
    paddingBottom: 0,
    paddingRight: theme.display.space2,
    alignItems: 'center',
    gap: theme.display.space2,
    borderRadius: theme.display.radius1,
  },
  status: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    overflow: 'hidden',
    color: theme.colors.cardForeground,
    fontFamily: theme.font.family,
    fontSize: theme.font.size,
    fontStyle: 'normal',
    fontWeight: theme.font.weight,
    lineHeight: theme.font.headerHeight,
    letterSpacing: theme.font.contentSpacing,
  },
  contents: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.display.space1,
  },
  icon: {
    color: theme.colors.mutedForeground,
    size: 18,
  },
}));
