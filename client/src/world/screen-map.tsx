import Map, {Popup, MapRef} from 'react-map-gl/maplibre';
import {setFocus} from '@noriginmedia/norigin-spatial-navigation';
import {toast} from 'react-exo/toast';
import {useQuery} from '@evolu/react';
import {useEffect} from 'react';
import {useLingui} from '@lingui/react/macro';
import {useMMKVBoolean} from 'react-native-mmkv';
import {useMemo, useState, useRef} from 'react';
import {View, Text, Pressable} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {useTheme} from 'settings/hooks/use-theme';
import {Screen} from 'app/ui/screen';
import {device, mmkv, store} from 'app/data/lib/device';
import {getLastLocations} from 'app/data/queries';
import {getDeviceIcon} from 'app/lib/platform';
import {DeviceId} from 'app/data/types';
import {DeviceEvolu, DeviceLocal} from 'media/stacks/device';
import {MarkerDevice} from './stacks/marker-device';

export default function ScreenMap() {
  const locations = useQuery(getLastLocations);
  const localDevice = useMemo(() => locations.find(l => l.deviceId === device.id), [locations]);
  const [deviceTracking, setDeviceTracking] = useMMKVBoolean(store.tracking, mmkv);
  const [trackingEnabled, setTrackingEnabled] = useState(deviceTracking);
  const [selectedDeviceId, setSelectedDeviceId] = useState<DeviceId | null>(localDevice?.deviceId ?? null);
  const [scheme] = useTheme();
  const {t} = useLingui();
  const mapRef = useRef<MapRef>(null);

  const profile = {maptilerUrl: undefined, maptilerKey: undefined} // TODO: get profile
  const maptilerUrl = profile?.maptilerUrl ?? 'https://api.maptiler.com';
  const maptilerKey = profile?.maptilerKey ?? 'v75KlHHSXtWqCs3puQsX';

  const selectedDevice = useMemo(() => {
    if (!selectedDeviceId) return null;
    const target = locations.find(l => l.deviceId === selectedDeviceId);
    return {
      id: target?.deviceId ?? device.id,
      name: target?.deviceName ?? null,
      icon: target?.platform ? getDeviceIcon(target.platform) : 'ph:devices',
      online: Boolean(target?.online),
      latitude: target?.latitude,
      longitude: target?.longitude,
      storageUsed: target?.storageUsed,
      storageTotal: target?.storageTotal,
      transparent: true,
      disableAdaptiveSize: true,
    };
  }, [selectedDeviceId, locations]);

  // Navigate to next device if arrow right is pressed, return false
  // Navigate to previous device if arrow left is pressed, return false
  // If first device in list, return true to navigate to menu out of map
  const handleArrowPress = (dir: string): boolean => {
    if (!selectedDeviceId || locations.length === 0) return true;
    const idx = locations.findIndex(l => l.deviceId === selectedDeviceId);
    if (idx === -1) return true;
    if (dir === 'right') {
      const nextIdx = (idx + 1) % locations.length;
      const targetId = locations[nextIdx].deviceId;
      setSelectedDeviceId(targetId);
      setFocus(`device-${targetId}`);
      return false;
    } else if (dir === 'left') {
      if (idx === 0) {
        // First device, allow navigation out
        return true;
      }
      const prevIdx = idx - 1;
      const targetId = locations[prevIdx].deviceId;
      setSelectedDeviceId(targetId);
      setFocus(`device-${targetId}`);
      return false;
    }
    return true;
  };

  // Fly to device location when selected device changes
  useEffect(() => {
    if (!mapRef.current) return;
    if (selectedDevice?.id && selectedDevice.longitude && selectedDevice.latitude) {
      mapRef.current?.flyTo({
        center: [selectedDevice.longitude, selectedDevice.latitude],
        zoom: 14,
        duration: 2000,
        essential: true,
      });
    }
  }, [selectedDevice, mapRef]);

  return (
    <Screen>
      <Map
        ref={mapRef}
        style={{width: '100%', height: '100%'}}
        mapStyle={`${maptilerUrl}/maps/${`dataviz-${scheme}`}/style.json?key=${maptilerKey}`}
        initialViewState={{
          latitude: localDevice?.latitude || undefined,
          longitude: localDevice?.longitude || undefined,
          zoom: localDevice?.latitude ? 14 : 1,
        }}>
        {locations.map(location => (
          <MarkerDevice
            key={location.deviceId}
            online={Boolean(location.online)}
            isSelf={location.deviceId === device?.id}
            latitude={location.latitude ?? 0}
            longitude={location.longitude ?? 0}
            onClick={() => setSelectedDeviceId(location.deviceId)}
          />
        ))}
        {selectedDeviceId && selectedDevice?.id && (
          <Popup
            onClose={() => setSelectedDeviceId(null)}
            offset={selectedDevice.id === device.id ? 20 : 16}
            latitude={selectedDevice.latitude ?? 0}
            longitude={selectedDevice.longitude ?? 0}
            maxWidth="300px"
            anchor="bottom">
            <View style={styles.popupContainer}>
              {selectedDevice.id === device.id
                ? <DeviceLocal {...selectedDevice} onArrowPress={handleArrowPress}/>
                : <DeviceEvolu {...selectedDevice} onArrowPress={handleArrowPress}/>
              }
            </View>
          </Popup>
        )}
      </Map>
      <Pressable
        style={styles.toggleContainer}
        onPress={() => {
          setDeviceTracking(prev => {
            const newTracking = !prev;
            setTrackingEnabled(newTracking);
            toast({title: newTracking
              ? t`Enabled location tracking (requires reload)`
              : t`Disabled location tracking (requires reload)`, preset: 'done'});
            return newTracking;
          });
        }}>
        <View style={[
          styles.toggleTrack,
          trackingEnabled && styles.toggleTrackActive
        ]}>
          <View style={[
            styles.toggleThumb,
            trackingEnabled && styles.toggleThumbActive
          ]} />
        </View>
        <Text selectable={false} style={styles.toggleLabel}>
          Track Device
        </Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create(theme => ({
  toggleContainer: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: theme.colors.card,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  toggleTrack: {
    width: 32,
    height: 16,
    borderRadius: 9,
    backgroundColor: theme.colors.border,
    borderWidth: 1,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleTrackActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  toggleThumb: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  toggleLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: theme.colors.foreground,
  },
  popupContainer: {
    width: 200,
    height: 200,
  },
}));
