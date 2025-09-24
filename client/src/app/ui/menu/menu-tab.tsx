import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {useVariants} from 'react-exo/utils';
import {useRoute} from '@react-navigation/native';
import {Link} from '@react-navigation/native';
import {Icon} from 'react-exo/icon';

import type {RootStackParamList} from 'app/navigation';

interface MenuTabProps extends React.PropsWithChildren {
  label: string,
  path: keyof RootStackParamList,
  icon: React.ReactElement,
}

export const MenuTabVariants = {
  state: ['Default', 'Active'],
} as const;

export function MenuTab(props: MenuTabProps) {
  const route = useRoute();
  const state = route.name === props.path ? 'Active' : 'Default';
  const {vstyles} = useVariants(MenuTabVariants, {state}, styles);

  return (
    <Link screen={props.path} params={{}}>
      <View style={vstyles.item()}>
        {props.icon && Icon.New(props.icon, vstyles.icon())}
        <Text style={vstyles.label()}>
          {props.label}
        </Text>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create((theme) => ({
  item: {
    width: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.display.space1,
    borderRadius: theme.display.radius1,
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
