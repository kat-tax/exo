import {useEffect} from 'react';
import {useInitialTheme, UnistylesRuntime} from 'react-native-unistyles';
import {StatusBar, Appearance} from 'react-native';
import {GestureProvider} from 'react-exo/gesture';
import {ToastRoot} from 'react-exo/toast';
import {useScheme} from 'app/hooks/useScheme';
import {hideBootsplash} from 'app/utils/bootsplash';

export function Theme(props: React.PropsWithChildren) {
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

  return (
    <GestureProvider style={{flex: 1}}>
      <StatusBar
        barStyle={`${theme}-content`}
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
