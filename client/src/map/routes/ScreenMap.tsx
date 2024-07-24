import Map from 'react-map-gl/maplibre';
import {View} from 'react-native';
import {useState} from 'react';
import {useDevices} from 'app/data';
import {useAppContext} from 'app/hooks/useAppContext';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useScheme} from 'settings/hooks/useScheme';
import {MarkerDevice} from 'map/base/MarkerDevice';

const MAPTILER_URL = 'https://api.maptiler.com/maps/';
const MAPTILER_KEY = 'UbdBChbHpiVOSIdTJWvV';

export default function ScreenMap() {
  const devices = useDevices();
  const {device} = useAppContext();
  const [scheme] = useScheme();
  const {styles} = useStyles(stylesheet);
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
        mapStyle={`${MAPTILER_URL}${mapId}/style.json?key=${MAPTILER_KEY}`}
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
    </View>
  );
}

const stylesheet = createStyleSheet(() => ({
  root: {
    flex: 1,
  },
}));
