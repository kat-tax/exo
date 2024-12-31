import {Map, Source, Layer} from 'react-map-gl/maplibre';

import {View} from 'react-native';
import {useEffect, useState, forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileData} from 'media/hooks/useFileData';
import {useScheme} from 'app/hooks/useScheme';
import {getBounds} from 'app/utils/mapping';
import {MarkerGeoJson} from 'world/stacks/MarkerGeoJson';

import type {FileProps} from 'media/file';
import type {LngLatBounds} from 'maplibre-gl';

export interface FileMap extends FileProps {
  name: string,
  extension: string,
}

const MAPTILER_URL = 'https://api.maptiler.com/maps/';
const MAPTILER_KEY = 'UbdBChbHpiVOSIdTJWvV';

export default forwardRef((props: FileMap) => {
  const [bounds, setBounds] = useState<LngLatBounds | null>(null);
  const {styles, theme} = useStyles(stylesheet);
  const [scheme] = useScheme();
  const source = useFileData(props.path, 'text');
  const url = useFileData(props.path, 'dataUrl');
  const [markers, setMarkers] = useState<GeoJSON.Feature<GeoJSON.Point>[]>([]);
  // Set bounds when source data is loaded
  useEffect(() => {
    if (!source) return;
    const geojson = JSON.parse(source) as GeoJSON.FeatureCollection;
    const bounds = getBounds(geojson, 0.01);
    setBounds(bounds);
    // Extract points from features
    const points: GeoJSON.Feature<GeoJSON.Point>[] = [];
    for (const feature of geojson.features) {
      if (feature.geometry.type === 'Point') {
        points.push(feature as GeoJSON.Feature<GeoJSON.Point>);
      }
    }
    setMarkers(points);
  }, [source]);

  return source ? (
    <View style={[styles.root, props.maximized && styles.maximized]}>
      <Map
        style={{width: '100%', height: '100%'}}
        mapStyle={`${MAPTILER_URL}${scheme === 'light' ? 'dataviz-light' : 'dataviz-dark'}/style.json?key=${MAPTILER_KEY}`}
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
