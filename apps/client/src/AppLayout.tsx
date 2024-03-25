import {useCallback} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Outlet} from 'react-exo/navigation';
import {View} from 'react-native';
import {Menu} from 'common/base/Menu';

export const APP_MENU_WIDTH = 200;

export function AppLayout() {
  const {styles} = useStyles(stylesheet);
  const openMenu = useCallback(() => {}, []);
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.menu}>
        <Menu/>
      </View>
      <Outlet context={[openMenu]}/>
    </SafeAreaView>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    flex: 1,
    flexDirection: 'row',
  },
  menu: {
    width: APP_MENU_WIDTH,
    borderRightWidth: 1,
    borderColor: '#333',
  },
}));
