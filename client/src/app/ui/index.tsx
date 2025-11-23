import {toast} from 'react-exo/toast';
import {useEffect} from 'react';
import {useLingui} from '@lingui/react/macro';
import {ToastRoot} from 'react-exo/toast';
import {Appearance} from 'react-native';
import {SystemBars} from 'react-native-edge-to-edge';
import {UnistylesRuntime} from 'react-native-unistyles';
// import Geolocation from '@react-native-community/geolocation';
import {isOnline, suscribeOnline} from 'react-exo/device';
import {GestureProvider} from 'react-exo/gesture';
import {CameraProvider} from 'media/cam/context';
import {useTheme} from 'settings/hooks/use-theme';
import {useFileSync} from 'app/data/lib/file-watcher';
import {useEvolu} from 'app/data';
import {device} from 'app/data/lib/device';

import type {UnistylesThemes} from 'react-native-unistyles';
export type Theme = UnistylesThemes[keyof UnistylesThemes];

export function Interface(props: React.PropsWithChildren) {
  const {t} = useLingui();
  const evolu = useEvolu();
  const [scheme] = useTheme();

  // File changes
  useFileSync();

  // Theme changes
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

  // Network changes
  useEffect(() => {
    const update = (isOnline: boolean, init?: boolean) => {
      const online = isOnline ? 1 : 0;
      if (online && !init) {
        toast({title: t`You are online`, preset: 'done'});
      } else if (!online) {
        toast({title: t`You are offline`, preset: 'error'});
      }
      evolu.update('app_device', {...device, online});
    };
    isOnline().then(online => update(online, true));
    return suscribeOnline(update);
  }, [t]);

  // Position
  // useEffect(() => {
  //   const id = Geolocation.watchPosition(
  //     ({coords: {latitude, longitude}}) => setGeoloc([latitude, longitude]),
  //     ({message}) => message !== 'Position update is unavailable'
  //       && toast({title: t`Geolocation Error`, preset: 'error', message}),
  //   );
  //   return () => Geolocation.clearWatch(id);
  // }, [t]);

  return (
    <CameraProvider>
      <GestureProvider style={{flex: 1}}>
        <SystemBars style={scheme === 'dark' ? 'light' : 'dark'}/>
        {props.children}
        <ToastRoot
          theme={scheme === 'dark' ? 'dark' : 'light'}
          position="bottom-center"
          offset={12}
        />
      </GestureProvider>
    </CameraProvider>
  );
}
