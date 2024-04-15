import {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {ToastRoot} from 'react-exo/toast';
import {BootSplash} from 'react-exo/device';
import {useOnline} from 'core/hooks/useOnline';
import {useScheme} from 'settings/hooks/useScheme';

export function Layout(props: React.PropsWithChildren) {
  const online = useOnline();
  const [scheme] = useScheme();
  const isDark = scheme === 'dark';
  
  useEffect(() => {
    BootSplash.hide();
  }, []);

  return <>
    <StatusBar
      barStyle={isDark ? 'light-content' : 'dark-content'}
      networkActivityIndicatorVisible={online === false}
    />
    {props.children}
    <ToastRoot position='bottom-right'/>
  </>
}
