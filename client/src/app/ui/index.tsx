import {toast} from 'react-exo/toast';
import {useLingui} from '@lingui/react/macro';
import {useMMKVBoolean} from 'react-native-mmkv';
import {useEffect, useRef} from 'react';
import {UnistylesRuntime} from 'react-native-unistyles';
import Geolocation from '@react-native-community/geolocation';
import {Appearance} from 'react-native';
import {SystemBars} from 'react-native-edge-to-edge';
import {ToastRoot} from 'react-exo/toast';
import {isOnline, suscribeOnline} from 'react-exo/device';
import {GestureProvider} from 'react-exo/gesture';
import {CameraProvider} from 'media/cam/context';
import {useTheme} from 'settings/hooks/use-theme';
import {useEvolu} from 'app/data';
import {useFileSync} from 'app/data/lib/file-watcher';
import {preventDragDrop} from 'app/lib/dragdrop';
import {device, mmkv, store} from 'app/data/lib/device';

import type {UnistylesThemes} from 'react-native-unistyles';
export type Theme = UnistylesThemes[keyof UnistylesThemes];

export function Interface(props: React.PropsWithChildren) {
  const {t} = useLingui();
  const evolu = useEvolu();
  const [scheme] = useTheme();
  const locationRef = useRef<[latitude: number, longitude: number] | null>(null);
  const [deviceTracking] = useMMKVBoolean(store.tracking, mmkv);

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
  useEffect(() => {
    if (!deviceTracking) return;
    const id = Geolocation.watchPosition(
      ({coords: {latitude, longitude}}) => {
        const [lastLat, lastLong] = locationRef.current ?? [0, 0];
        if (lastLat === latitude && lastLong === longitude) return;
        locationRef.current = [latitude, longitude];
        if (deviceTracking) {
          evolu.insert('app_location', {deviceId: device.id, latitude, longitude});
        }
      },
      ({message}) => {
        if (message) {
          toast({title: t`Geolocation Error`, preset: 'error', message});
        }
      },
      {enableHighAccuracy: true}
    );
    return () => Geolocation.clearWatch(id);
  }, [t, evolu, deviceTracking]);

  // Prevent drag and drop on root
  useEffect(() => {
    if (__WEB__) {
      const element = document.body;
      return preventDragDrop(element);
    }
  }, []);

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
