import {useEffect} from 'react';
import {UnistylesRuntime} from 'react-native-unistyles';
import {StatusBar, Appearance} from 'react-native';
import {GestureProvider} from 'react-exo/gesture';
import {ToastRoot} from 'react-exo/toast';
import {useTheme} from 'app/hooks/use-theme';

export function Theme(props: React.PropsWithChildren) {
  const [scheme] = useTheme();

  useEffect(() => {
    if (scheme) {
      UnistylesRuntime.setTheme(scheme);
      Appearance?.setColorScheme?.(scheme);
      UnistylesRuntime.setRootViewBackgroundColor(scheme === 'dark' ? '#000000' : '#ffffff');
    }
  }, [scheme]);

  return (
    <GestureProvider style={{flex: 1}}>
      <StatusBar
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      {props.children}
      <ToastRoot
        theme={scheme === 'dark' ? 'dark' : 'light'}
        position="bottom-center"
        offset={12}
      />
    </GestureProvider>
  );
}
