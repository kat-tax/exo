import {useEffect} from 'react';
import {useInitialTheme, UnistylesRuntime} from 'react-native-unistyles';
import {StatusBar, Appearance} from 'react-native';
import {ToastRoot} from 'react-exo/toast';
import {useScheme} from 'settings/hooks/useScheme';
import Bootsplash from 'react-native-bootsplash/src/index';

export function Layout(props: React.PropsWithChildren) {
  const [scheme] = useScheme();
  const theme = scheme === 'dark' ? 'dark' : 'light';

  useInitialTheme(theme);
  
  useEffect(() => {
    if (scheme) {
      UnistylesRuntime.setTheme(scheme);
      if (Appearance?.setColorScheme) {
        Appearance.setColorScheme(scheme);
      }
    }
  }, [scheme]);

  useEffect(() => {
    Bootsplash.hide();
  }, []);

  return <>
    <StatusBar barStyle={`${theme}-content`}/>
    {props.children}
    <ToastRoot theme={theme} position="bottom-center" offset={12}/>
  </>
}
