import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
//import {useLocation, Link} from 'react-exo/navigation';
import {useRoute} from '@react-navigation/native';
import {Link} from '@react-navigation/native';
import {Icon} from 'react-exo/icon';

import type {RootStackParamList} from 'app/navigation';

interface MenuTabProps extends React.PropsWithChildren {
  label: string,
  path: keyof RootStackParamList,
  icon: React.ReactElement,
}

export function MenuTab(props: MenuTabProps) {
  //const {pathname} = useLocation();
  //const isActive = props.path === decodeURIComponent(pathname);
  const route = useRoute();
  const isActive = route.name === props.path;

  return (
    <Link screen={props.path} params={{}}>
      <View style={styles.item}>
        {props.icon && Icon.New(props.icon, {
          size: 20,
          uniProps: (theme: any) => ({
            color: isActive
              ? theme.colors.foreground
              : theme.colors.mutedForeground,
          }),
        })}
        <Text style={[styles.label, isActive && styles.active]}>
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
  active: {
    color: theme.colors.foreground,
  },
}));
