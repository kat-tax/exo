import {useEffect} from 'react';
import {ToastRoot} from 'react-exo/toast';
//import {BootSplash} from 'react-exo/device';
import {StatusBar, Appearance} from 'react-native';
import {useInitialTheme, UnistylesRuntime} from 'design/styles';
import {useOnline} from 'core/hooks/useOnline';
import {useScheme} from 'settings/hooks/useScheme';

export function Layout(props: React.PropsWithChildren) {
  const online = useOnline();
  const [scheme] = useScheme();

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
    //BootSplash.hide();
  }, []);

  return <>
    <StatusBar
      barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
      networkActivityIndicatorVisible={online === false}
    />
    {props.children}
    <ToastRoot position='bottom-right'/>
  </>
}
