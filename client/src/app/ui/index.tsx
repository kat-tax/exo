import {useEffect} from 'react';
import {Appearance} from 'react-native';
import {SystemBars} from 'react-native-edge-to-edge';
import {UnistylesRuntime} from 'react-native-unistyles';
import {GestureProvider} from 'react-exo/gesture';
import {ToastRoot} from 'react-exo/toast';
import {useTheme} from 'settings/hooks/use-theme';

import type {UnistylesThemes} from 'react-native-unistyles';
export type Theme = UnistylesThemes[keyof UnistylesThemes];

export function Interface(props: React.PropsWithChildren) {
  const [scheme] = useTheme();

  useEffect(() => {
    if (scheme) {
      UnistylesRuntime.setTheme(scheme);
      UnistylesRuntime.setRootViewBackgroundColor(scheme === 'dark' ? '#000000' : '#ffffff');
      if (__WEB__) {
        document.documentElement.style.colorScheme = scheme;
      } else {
        Appearance?.setColorScheme?.(scheme);
      }
    }
  }, [scheme]);

  return (
    <GestureProvider style={{flex: 1}}>
      <SystemBars
        style={scheme === 'dark' ? 'light' : 'dark'}
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
