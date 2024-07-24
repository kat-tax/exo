import {StatusBar, Appearance} from 'react-native';
import {ToastRoot} from 'react-exo/toast';
import {useEffect} from 'react';
import {useInitialTheme, UnistylesRuntime} from 'react-native-unistyles';
import {useScheme} from 'settings/hooks/useScheme';
import {hideBootsplash} from 'app/utils/bootsplash';

export function Layout(props: React.PropsWithChildren) {
  const [scheme] = useScheme();
  const theme = scheme === 'dark' ? 'dark' : 'light';

  useInitialTheme(theme);
  useEffect(hideBootsplash, []);
  useEffect(() => {
    if (scheme) {
      UnistylesRuntime.setTheme(scheme);
      if (Appearance?.setColorScheme) {
        Appearance.setColorScheme(scheme);
      }
    }
  }, [scheme]);

  return <>
    <StatusBar barStyle={`${theme}-content`}/>
    {props.children}
    <ToastRoot theme={theme} position="bottom-center" offset={12}/>
  </>
}
