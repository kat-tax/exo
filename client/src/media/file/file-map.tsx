import {View} from 'react-native';
import {Map, Source, Layer} from 'react-map-gl/maplibre';
import {useEffect, useState, forwardRef} from 'react';
import {StyleSheet} from 'react-native-unistyles';
import {useTheme} from 'settings/hooks/use-theme';
import {useFile} from 'media/file/hooks/use-file';
import {getBounds} from 'app/lib/mapping';
import {MarkerGeoJson} from 'world/stacks/marker-geojson';

import type {FileProps} from 'media/file';
import type {LngLatBounds} from 'maplibre-gl';

export interface FileMap extends FileProps {}

export default forwardRef(({path, actions, maximized}: FileMap) => {
  const url = useFile(path, 'dataUrl');
  const source = useFile(path, 'text');
  const [scheme] = useTheme();
  const [markers, setMarkers] = useState<GeoJSON.Feature<GeoJSON.Point>[]>([]);
  const [bounds, setBounds] = useState<LngLatBounds | null>(null);

  const fillColor = scheme === 'dark' ? '#000' : '#999';
  const fillOutlineColor = scheme === 'dark' ? '#fff' : '#000';

  const profile = {maptilerUrl: undefined, maptilerKey: undefined} // TODO: get profile
  const maptilerUrl = profile?.maptilerUrl ?? 'https://api.maptiler.com';
  const maptilerKey = profile?.maptilerKey ?? 'v75KlHHSXtWqCs3puQsX';

  useEffect(() => {
    if (!source) return;
    let features = 0;
    const geojson = JSON.parse(source) as GeoJSON.FeatureCollection;
    const bounds = getBounds(geojson, 0.5);
    setBounds(bounds);
    const points: GeoJSON.Feature<GeoJSON.Point>[] = [];
    if (geojson.features) {
      for (const feature of geojson.features) {
        features++;
        if (feature.geometry.type === 'Point') {
          points.push(feature as GeoJSON.Feature<GeoJSON.Point>);
        }
      }
    }
    actions.setInfo(`${features} features`);
    setMarkers(points);
  }, [source, actions]);

  return source ? (
    <View style={[styles.root, maximized && styles.maximized]}>
      <Map
        style={{width: '100%', height: '100%'}}
        mapStyle={`${maptilerUrl}/maps/${`dataviz-${scheme}`}/style.json?key=${maptilerKey}`}
        maxBounds={bounds ?? undefined}>
        <Source
          id="file"
          type="geojson"
          data={url ?? ''}
        />
        <Layer
          id="file"
          type="fill"
          source="file"
          paint={{
            'fill-antialias': true,
            'fill-opacity': 0.2,
            'fill-color': fillColor,
            'fill-outline-color': fillOutlineColor,
          }}
        />
        {markers.map(feature => (
          <MarkerGeoJson
            key={feature.id}
            longitude={feature.geometry.coordinates[0]}
            latitude={feature.geometry.coordinates[1]}
          />
        ))}
      </Map>
    </View>
  ) : null;
});

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
  },
  maximized: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border,
    overflow: 'hidden',
  },
}));
