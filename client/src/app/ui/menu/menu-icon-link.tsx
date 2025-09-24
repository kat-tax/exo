import {Icon} from 'react-exo/icon';
import {View} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {useFocusable} from '@noriginmedia/norigin-spatial-navigation';
import {useVariants} from 'react-exo/utils';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import {Link} from '@react-navigation/native';

import type {RootStackParamList} from 'app/navigation';

interface MenuIconLinkProps extends React.PropsWithChildren {
  label: string,
  path: keyof RootStackParamList,
  icon: React.ReactElement,
}

export const MenuIconLinkVariants = {
  state: ['Default', 'Active', 'Focused'],
} as const;

export function MenuIconLink(props: MenuIconLinkProps) {
  const nav = useNavigation();
  const route = useRoute();
  const {ref, focused} = useFocusable({
    focusKey: `menu@${props.path}`,
    onEnterPress: () => nav.navigate(props.path as any),
  });

  const active = route.name === props.path;
  const state = active ? 'Active' : focused ? 'Focused' : 'Default';
  const {vstyles} = useVariants(MenuIconLinkVariants, {state}, styles);

  return (
    <Link screen={props.path} params={{}} style={{width: '100%'}}>
      <View aria-label={props.label} ref={ref} style={vstyles.item()}>
        {props.icon && Icon.New(props.icon, vstyles.icon())}
      </View>
    </Link>
  );
}

const styles = StyleSheet.create((theme) => ({
  item: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.display.space1,
    borderRadius: theme.display.radius1,
    borderColor: 'transparent',
    borderWidth: 1,
  },
  itemStateActive: {
    backgroundColor: theme.colors.secondary,
  },
  itemStateFocused: {
    borderColor: theme.colors.ring,
  },
  icon: {
    color: theme.colors.mutedForeground,
    size: __TOUCH__ ? 20 : 16,
  },
  iconStateActive: {
    color: theme.colors.foreground,
  },
}));
