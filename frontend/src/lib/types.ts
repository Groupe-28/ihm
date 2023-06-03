import { Geometry } from 'geojson';

export type Log = {
  id: number;
  content: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

export type GeoObject = {
  id: number;
  type: Geometry['type'];
  createdAt: Date;
  updatedAt: Date;
  points: GeoPoint[];
};

export type GeoPoint = {
  id: number;
  geoObjectId: number;
  latitude: number;
  longitude: number;
};

export type GeoPointCreateInput = {
  latitude: number;
  longitude: number;
};

export type GeoObjectCreateInput = {
  type: string;
  points?: GeoPointCreateInput[];
};
