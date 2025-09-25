import {Icon} from 'react-exo/icon';
import {Link} from '@react-navigation/native';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {useVariants} from 'react-exo/utils';
import {useLinkState} from './use-link-state';
import {MenuLinkVariants} from './menu-link';
import type {MenuLinkProps} from './menu-link';

export function MenuLinkList(props: MenuLinkProps) {
  const {ref, state} = useLinkState(props);
  const {vstyles} = useVariants(MenuLinkVariants, {state}, styles);

  return (
    <Link screen={props.path} params={{}} style={{width: '100%'}}>
      <View ref={ref} style={vstyles.root()}>
        {props.icon && Icon.New(props.icon, vstyles.icon())}
        <Text style={vstyles.label()}>
          {props.label}
        </Text>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.display.radius1,
    paddingHorizontal: theme.display.space2,
    borderColor: 'transparent',
    borderWidth: 1,
  },
  rootStateActive: {
    backgroundColor: theme.colors.secondary,
  },
  rootStateFocused: {
    borderColor: theme.colors.ring,
  },
  icon: {
    color: theme.colors.mutedForeground,
    size: __TOUCH__ ? 20 : 18,
  },
  iconStateActive: {
    color: theme.colors.foreground,
  },
  label: {
    userSelect: 'none',
    marginHorizontal: theme.display.space1,
    color: theme.colors.secondaryForeground,
    fontSize: theme.font.size,
    lineHeight: theme.font.headerHeight,
    letterSpacing: theme.font.spacing,
    ...__TOUCH__ && {
      marginLeft: theme.display.space2,
      lineHeight: 40,
      fontSize: 14,
    },
  },
}));

