import {StyleSheet} from 'react-native-unistyles';
import {View} from 'react-native';
import {Menu} from 'app/ui/menu';

export const APP_MENU_WIDTH = 146;
export const APP_MENU_TAB_HEIGHT = 64;

export default function LayoutApp({children}: React.PropsWithChildren) {
  return (
    <View style={styles.root}>
      <View style={styles.menu}>
        <Menu/>
      </View>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
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
      xs: __WEB__ ? APP_MENU_WIDTH : undefined,
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
