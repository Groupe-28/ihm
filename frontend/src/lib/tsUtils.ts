import {
  Geometry as DefaultGeometry,
  GeometryCollection,
  Position,
} from 'geojson';

import { range } from 'd3-array';
import { scaleQuantile } from 'd3-scale';

export function isJSONObject(str: string) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

export type WithoutGeometryCollection<T extends DefaultGeometry> =
  T extends GeometryCollection ? never : T;

type Geometry = WithoutGeometryCollection<DefaultGeometry>;

export function convertToCoordinates(
  coord: Geometry['coordinates'],
): { latitude: number; longitude: number }[] {
  const result: { latitude: number; longitude: number }[] = [];

  // Helper function to convert Position to { latitude, longitude }
  function convertPositionToCoordinates(position: Position): {
    latitude: number;
    longitude: number;
  } {
    const [latitude, longitude] = position;
    return { latitude, longitude };
  }

  // Recursive function to handle nested arrays
  function processCoordinates(coordinates: Geometry['coordinates']): void {
    for (const item of coordinates) {
      if (Array.isArray(item)) {
        if (Array.isArray(item[0])) {
          processCoordinates(item);
        } else {
          result.push(convertPositionToCoordinates(item as Position));
        }
      } else if (typeof item === 'number') {
        throw new Error('Invalid coordinate type');
      } else {
        result.push(convertPositionToCoordinates(item as Position));
      }
    }
  }

  // Handle different coordinate types
  if (Array.isArray(coord)) {
    processCoordinates(coord);
  } else if (typeof coord === 'object' && coord !== null) {
    result.push(convertPositionToCoordinates(coord));
  } else {
    throw new Error('Invalid coordinate type');
  }

  return result;
}

export function updatePercentiles(
  featureCollection: GeoJSON.FeatureCollection<GeoJSON.Geometry>,
  accessor: (f: GeoJSON.Feature<GeoJSON.Geometry>) => number,
): GeoJSON.FeatureCollection<GeoJSON.Geometry> {
  const { features } = featureCollection;
  const scale = scaleQuantile().domain(features.map(accessor)).range(range(9));
  return {
    type: 'FeatureCollection',
    features: features.map((f) => {
      const value = accessor(f);
      const properties = {
        ...f.properties,
        value,
        percentile: scale(value),
      };
      return { ...f, properties };
    }),
  };
}
