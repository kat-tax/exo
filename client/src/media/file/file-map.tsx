import {View} from 'react-native';
import {Map, Source, Layer} from 'react-map-gl/maplibre';
import {useEffect, useState, forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useTheme} from 'app/hooks/use-display';
import {useApp} from 'app/hooks/use-app';
import {useFile} from 'media/file/hooks/use-file';
import {getBounds} from 'app/utils/mapping';
import {MarkerGeoJson} from 'world/stacks/marker-geojson';

import type {FileProps} from 'media/file';
import type {LngLatBounds} from 'maplibre-gl';

export interface FileMap extends FileProps {}

export default forwardRef(({path, actions, maximized}: FileMap) => {
  const url = useFile(path, 'dataUrl');
  const source = useFile(path, 'text');
  const [scheme] = useTheme();
  const {profile} = useApp();
  const {styles, theme} = useStyles(stylesheet);
  const [markers, setMarkers] = useState<GeoJSON.Feature<GeoJSON.Point>[]>([]);
  const [bounds, setBounds] = useState<LngLatBounds | null>(null);
  const maptilerUrl = profile?.maptilerUrl ?? 'https://api.maptiler.com';
  const maptilerKey = profile?.maptilerKey ?? '';

  useEffect(() => {
    if (!source) return;
    let features = 0;
    const geojson = JSON.parse(source) as GeoJSON.FeatureCollection;
    const bounds = getBounds(geojson, 0.01);
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
          data={url}
        />
        <Layer
          id="file"
          type="fill"
          source="file"
          paint={{
            'fill-opacity': 0.2,
            'fill-color': theme.colors.foreground,
            'fill-outline-color': theme.colors.border,
            'fill-antialias': true,
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

const stylesheet = createStyleSheet((theme, rt) => ({
  root: {
    flex: 1,
  },
  maximized: {
    borderTopWidth: rt.hairlineWidth,
    borderColor: theme.colors.border,
    overflow: 'hidden',
  },
}));
