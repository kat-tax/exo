import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {Outlet} from 'react-exo/navigation';
import {View} from 'react-native';
import {Menu} from 'app/routes/menu';

export const APP_MENU_WIDTH = 146;
export const APP_MENU_TAB_HEIGHT = 64;

export default function Layout() {
  const {styles} = useStyles(stylesheet);

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

const stylesheet = createStyleSheet(theme => ({
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
      xs: APP_MENU_WIDTH,
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
