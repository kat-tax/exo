import {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {useStyles, createStyleSheet} from 'design/styles';
import {Outlet} from 'react-exo/navigation';
import {Menu} from 'core/base/Menu';

export const APP_MENU_WIDTH = 145;

export default function LayoutMain() {
  const {styles} = useStyles(stylesheet);
  const openMenu = useCallback(() => {}, []);
  return (
    <View style={styles.root}>
      <View style={styles.menu}>
        <Menu/>
      </View>
      <Outlet context={[openMenu]}/>
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: theme.colors.background,
  },
  menu: {
    width: APP_MENU_WIDTH,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border,
  },
}));
