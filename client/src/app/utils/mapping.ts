import {LngLatBounds} from 'maplibre-gl';

export function getBounds(
  geojson: GeoJSON.FeatureCollection,
  padding = 0,
) {
  const bounds = new LngLatBounds();
  const coords = geojson?.features?.flatMap(f => {
    if ('coordinates' in f.geometry) {
      const coords = f.geometry.coordinates;
      switch (f.geometry.type) {
        case 'Point':
          return [coords] as [number, number][];
        case 'LineString':
          return coords as [number, number][];
        case 'Polygon':
          return coords[0] as [number, number][];
        case 'MultiPoint':
          return coords as [number, number][];
        case 'MultiLineString':
          return coords.flat() as [number, number][];
        case 'MultiPolygon':
          return coords.flat(2) as [number, number][];
        default: f.geometry satisfies never;
      }
    }
    return [];
  });

  if (!coords) return null;

  for (const coord of coords) {
    bounds.extend(coord as [number, number]);
  }

  if (padding) {
    bounds.extend([
      bounds.getWest() - padding,
      bounds.getSouth() - padding,
      bounds.getEast() + padding,
      bounds.getNorth() + padding,
    ]);
  }

  return bounds;
}