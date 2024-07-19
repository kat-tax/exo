import Map from 'react-map-gl/maplibre';
import {View} from 'react-native';
import {useState} from 'react';
import {useOutletContext} from 'react-exo/navigation';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useScheme} from 'settings/hooks/useScheme';

import type {useDevice} from 'app/hooks/useDevice';

const MAPTILER_API_KEY = 'UbdBChbHpiVOSIdTJWvV';

export default function ScreenMap() {
  const [scheme] = useScheme();
  const {styles} = useStyles(stylesheet);
  const {coords} = useOutletContext<ReturnType<typeof useDevice>>();
  const [viewState, setViewState] = useState({
    longitude: coords?.[1] ?? 31.595833,
    latitude: coords?.[0] ?? -96.988056,
    zoom: 14,
  });

  const mapId = scheme === 'light'
    ? 'dataviz-light'
    : 'dataviz-dark';

  return coords ? (
    <View style={styles.root}>
      <Map
        {...viewState}
        style={{width: '100%', height: '100%'}}
        mapStyle={`https://api.maptiler.com/maps/${mapId}/style.json?key=${MAPTILER_API_KEY}`}
        onMove={e => setViewState(e.viewState)}
      />
    </View>
  ) : null;
}

const stylesheet = createStyleSheet(_theme => ({
  root: {
    flex: 1,
  },
}));
