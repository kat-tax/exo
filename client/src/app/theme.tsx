import {useEffect} from 'react';
import {useInitialTheme, UnistylesRuntime} from 'react-native-unistyles';
import {StatusBar, Appearance} from 'react-native';
import {GestureProvider} from 'react-exo/gesture';
import {ToastRoot} from 'react-exo/toast';
import {useTheme} from 'app/hooks/use-theme';

export function Theme(props: React.PropsWithChildren) {
  const [scheme] = useTheme();
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

  return (
    <GestureProvider style={{flex: 1}}>
      <StatusBar
        barStyle={theme === 'dark'
          ? 'light-content'
          : 'dark-content'
        }
      />
      {props.children}
      <ToastRoot
        theme={theme}
        offset={12}
        position="bottom-center"
      />
    </GestureProvider>
  );
}
