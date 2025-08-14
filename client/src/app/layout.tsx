import {StyleSheet} from 'react-native-unistyles';
import {Outlet} from 'react-exo/navigation';
import {View} from 'react-native';
import {Menu} from 'app/ui/menu';

export const APP_MENU_WIDTH = 146;
export const APP_MENU_TAB_HEIGHT = 64;

export default function LayoutApp() {
  return (
    <View style={styles.root}>
      <View style={styles.menu}>
        <Menu/>
      </View>
      <View style={styles.content}>
        <Outlet/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.neutral,
    flexDirection: {
      initial: 'column-reverse',
      xs: 'row',
    },
  },
  menu: {
    width: {
      initial: '100%',
      xs: __WEB__ ? 146 : 180,
    },
    marginBottom: {
      initial: rt.insets.bottom / 1.5,
      landscape: 0,
    },
    height: {
      initial: APP_MENU_TAB_HEIGHT,
      xs: undefined,
    },
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
}));
