import Map from 'react-map-gl/maplibre';
import {useState} from 'react';
import {useDevices} from 'app/data';
import {useTheme} from 'app/hooks/use-theme';
import {useApp} from 'app/hooks/use-app';
import {Panel} from 'app/stacks/panel';

import {MarkerDevice} from '../stacks/marker-device';

export default function ScreenMap() {
  const {device, profile} = useApp();
  const devices = useDevices();
  const [scheme] = useTheme();
  const [viewState, setViewState] = useState({
    latitude: device?.coords?.[0] ?? 0,
    longitude: device?.coords?.[1] ?? 0,
    zoom: device?.coords ? 14 : 1,
  });

  const maptilerUrl = profile?.maptilerUrl ?? 'https://api.maptiler.com';
  const maptilerKey = profile?.maptilerKey ?? '';
  return (
    <Panel fullWidth margin="none">
      <Map
        {...viewState}
        style={{width: '100%', height: '100%'}}
        mapStyle={`${maptilerUrl}/maps/${`dataviz-${scheme}`}/style.json?key=${maptilerKey}`}
        onMove={e => setViewState(e.viewState)}>
        {devices.map(d => (
          <MarkerDevice
            key={d.id}
            online={Boolean(d?.online)}
            isSelf={d.id === device?.id}
            latitude={d.coords?.[0] ?? 0}
            longitude={d.coords?.[1] ?? 0}
          />
        ))}
      </Map>
    </Panel>
  );
}
