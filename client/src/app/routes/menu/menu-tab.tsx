import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {useLocation, Link} from 'react-exo/navigation';
import {createIcon} from 'react-exo/utils';

interface MenuTabProps extends React.PropsWithChildren {
  label: string,
  path: string,
  icon: React.ReactElement,
}

export function MenuTab(props: MenuTabProps) {
  const {pathname} = useLocation();
  const isActive = props.path === decodeURIComponent(pathname);

  return (
    <Link to={props.path}>
      <View style={styles.item}>
        {props.icon && createIcon(props.icon, {
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
