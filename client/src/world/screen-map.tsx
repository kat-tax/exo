import Map from 'react-map-gl/maplibre';
import {toast} from 'react-exo/toast';
import {useQuery} from '@evolu/react';
import {useLingui} from '@lingui/react/macro';
import {useMemo, useState} from 'react';
import {useMMKVBoolean} from 'react-native-mmkv';
import {View, Text, Pressable} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {useTheme} from 'settings/hooks/use-theme';
import {Screen} from 'app/ui/screen';
import {device, mmkv, store} from 'app/data/lib/device';
import {getLastLocations} from 'app/data/queries';
import {MarkerDevice} from './stacks/marker-device';

export default function ScreenMap() {
  const locations = useQuery(getLastLocations);
  const localDevice = useMemo(() => locations.find(l => l.deviceId === device.id), [locations]);
  const [deviceTracking, setDeviceTracking] = useMMKVBoolean(store.tracking, mmkv);
  const [trackingEnabled, setTrackingEnabled] = useState(deviceTracking);
  const [scheme] = useTheme();
  const {t} = useLingui();

  const profile = {maptilerUrl: undefined, maptilerKey: undefined} // TODO: get profile
  const maptilerUrl = profile?.maptilerUrl ?? 'https://api.maptiler.com';
  const maptilerKey = profile?.maptilerKey ?? 'v75KlHHSXtWqCs3puQsX';
  return (
    <Screen>
      <Map
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
          />
        ))}
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
}));
