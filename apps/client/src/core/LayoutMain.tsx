import {View} from 'react-native';
import {useCallback} from 'react';
import {useStyles, createStyleSheet} from 'styles';
import {SafeAreaView} from 'react-exo/safe-area';
import {Outlet} from 'react-exo/router';
import {Menu} from 'core/components/Menu';

export const APP_MENU_WIDTH = 200;

export default function LayoutMain() {
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

const stylesheet = createStyleSheet(_theme => ({
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
