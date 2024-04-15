import {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {BootSplash} from 'react-exo/device';
import {useOnline} from 'core/hooks/useOnline';
import {useScheme} from 'settings/hooks/useScheme';

export function AppDisplay(props: React.PropsWithChildren) {
  const [scheme] = useScheme();
  const isDark = scheme === 'dark';
  const barStyle = isDark ? 'light-content' : 'dark-content';
  
  useOnline();
  useEffect(() => {
    BootSplash.hide();
  }, []);

  return (
    <>
      <StatusBar {...{barStyle}}/>
      {props.children}
    </>
  );
}
