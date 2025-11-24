import {View, Text} from 'react-native';
import {Map, Source, Layer, Popup} from 'react-map-gl/maplibre';
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
  const [selectedFeature, setSelectedFeature] = useState<{
    feature: GeoJSON.Feature;
    longitude: number;
    latitude: number;
  } | null>(null);

  const textColor = '#000';
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
        maxBounds={bounds ?? undefined}
        interactiveLayerIds={['file']}
        onClick={(event) => {
          const feature = event.features?.[0];
          if (feature && feature.properties) {
            setSelectedFeature({
              feature: feature as GeoJSON.Feature,
              longitude: event.lngLat.lng,
              latitude: event.lngLat.lat,
            });
          }
        }}>
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
        {/* <Layer
          id="file-labels"
          type="symbol"
          source="file"
          layout={{
            'text-field': ['coalesce', ['get', 'name'], ['get', 'title'], ''],
            'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
            'text-size': 14,
            'text-anchor': 'center',
            'text-offset': [0,-1.5],
            'text-allow-overlap': false,
            'text-ignore-placement': false,
          }}
          paint={{
            'text-color': textColor,
            'text-halo-color': scheme === 'dark' ? '#000' : '#fff',
            'text-halo-width': 2,
            'text-halo-blur': 1,
          }}
        /> */}
        {markers.map(feature => (
          <MarkerGeoJson
            key={feature.id}
            longitude={feature.geometry.coordinates[0]}
            latitude={feature.geometry.coordinates[1]}
            onClick={() => {
              setSelectedFeature({
                feature,
                longitude: feature.geometry.coordinates[0],
                latitude: feature.geometry.coordinates[1],
              });
            }}
          />
        ))}
        {selectedFeature && (
          <Popup
            longitude={selectedFeature.longitude}
            latitude={selectedFeature.latitude}
            anchor="bottom"
            onClose={() => setSelectedFeature(null)}
            maxWidth="400px">
            <View style={styles.popupContainer}>
              {selectedFeature.feature.properties && Object.entries(selectedFeature.feature.properties).map(([key, value]) => (
                <View key={key} style={styles.popupRow}>
                  <Text style={[styles.popupKey, {color: textColor}]}>
                    {key}:
                  </Text>
                  <Text style={[styles.popupValue, {color: textColor}]}>
                    {String(value)}
                  </Text>
                </View>
              ))}
            </View>
          </Popup>
        )}
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
  popupContainer: {
    gap: 4,
  },
  popupRow: {
    flexDirection: 'row',
    gap: 6,
  },
  popupKey: {
    fontFamily: theme.font.family,
    fontSize: theme.font.size - 1,
    fontWeight: '600',
    textTransform: 'uppercase',
    lineHeight: theme.font.height,
    letterSpacing: theme.font.spacing,
    flexShrink: 0,
  },
  popupValue: {
    fontFamily: theme.font.family,
    fontSize: theme.font.size - 1,
    fontWeight: theme.font.weight,
    lineHeight: theme.font.height,
    letterSpacing: theme.font.spacing,
    flex: 1,
  },
}));
