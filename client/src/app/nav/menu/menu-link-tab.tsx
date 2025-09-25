import {Icon} from 'react-exo/icon';
import {Link} from '@react-navigation/native';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {useVariants} from 'react-exo/utils';
import {useLinkState} from './use-link-state';
import {MenuLinkVariants} from './menu-link';
import type {MenuLinkProps} from './menu-link';

export function MenuLinkTab(props: MenuLinkProps) {
  const {ref, state} = useLinkState(props);
  const {vstyles} = useVariants(MenuLinkVariants, {state}, styles);

  return (
    <Link screen={props.path} params={{}}>
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
    width: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.display.space1,
    borderRadius: theme.display.radius1,
  },
  rootStateFocused: {
    borderColor: theme.colors.ring,
  },
  label: {
    userSelect: 'none',
    marginHorizontal: theme.display.space1,
    color: theme.colors.mutedForeground,
    lineHeight: 24,
    fontSize: 9,
  },
  labelStateActive: {
    color: theme.colors.foreground,
  },
  icon: {
    size: 20,
    color: theme.colors.mutedForeground,
  },
  iconStateActive: {
    color: theme.colors.foreground,
  },
}));
