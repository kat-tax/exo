import {useEffect} from 'react';
import {useInitialTheme, UnistylesRuntime} from 'react-native-unistyles';
import {StatusBar, Appearance} from 'react-native';
import {ToastRoot} from 'react-exo/toast';
//import Bootsplash from 'react-native-bootsplash';
import {useScheme} from 'settings/hooks/useScheme';

export function Layout(props: React.PropsWithChildren) {
  const [scheme] = useScheme();
  const isDark = scheme === 'dark';

  useInitialTheme(scheme || 'light');
  
  useEffect(() => {
    if (scheme) {
      UnistylesRuntime.setTheme(scheme);
      if (Appearance?.setColorScheme) {
        Appearance.setColorScheme(scheme);
      }
    }
  }, [scheme]);

  useEffect(() => {
    //Bootsplash.hide();
  }, []);

  return <>
    <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'}/>
    {props.children}
    <ToastRoot
      theme={isDark ? 'dark' : 'light'}
      position="bottom-center"
      offset={12}
    />
  </>
}
