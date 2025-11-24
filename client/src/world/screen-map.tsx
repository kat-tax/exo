import Map from 'react-map-gl/maplibre';
import {useMemo} from 'react';
import {useQuery} from '@evolu/react';
import {useTheme} from 'settings/hooks/use-theme';
import {Screen} from 'app/ui/screen';
import {device} from 'app/data/lib/device';
import {getLastLocations} from 'app/data/queries';
import {MarkerDevice} from './stacks/marker-device';

export default function ScreenMap() {
  const locations = useQuery(getLastLocations);
  const localDevice = useMemo(() => locations.find(l => l.deviceId === device.id), [locations]);
  const [scheme] = useTheme();

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
    </Screen>
  );
}
