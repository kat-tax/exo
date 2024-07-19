import Map, {Marker} from 'react-map-gl/maplibre';
import {Icon} from 'react-exo/icon';
import {View} from 'react-native';
import {useState} from 'react';
import {useDevices} from 'app/data';
import {useOutletContext} from 'react-exo/navigation';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useScheme} from 'settings/hooks/useScheme';

import type {useDeviceSession} from 'app/hooks/useDeviceSession';

const MAPTILER_API_KEY = 'UbdBChbHpiVOSIdTJWvV';

export default function ScreenMap() {
  const device = useOutletContext<ReturnType<typeof useDeviceSession>>();
  const devices = useDevices();
  const [scheme] = useScheme();
  const {styles, theme} = useStyles(stylesheet);
  const [viewState, setViewState] = useState({
    latitude: device?.coords?.[0] ?? 0,
    longitude: device?.coords?.[1] ?? 0,
    zoom: device?.coords ? 14 : 1,
  });

  const mapId = scheme === 'light'
    ? 'dataviz-light'
    : 'dataviz-dark';

  return (
    <View style={styles.root}>
      <Map
        {...viewState}
        style={{width: '100%', height: '100%'}}
        mapStyle={`https://api.maptiler.com/maps/${mapId}/style.json?key=${MAPTILER_API_KEY}`}
        onMove={e => setViewState(e.viewState)}>
        {devices.map(device => (
          <Marker
            key={device.id}
            latitude={device.coords?.[0] ?? 0}
            longitude={device.coords?.[1] ?? 0}>
            <Icon
              name="ph:map-pin"
              color={theme.colors.primary}
              size={32}
            />
          </Marker>
        ))}
      </Map>
    </View>
  );
}

const stylesheet = createStyleSheet(_theme => ({
  root: {
    flex: 1,
  },
}));
