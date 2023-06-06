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
  name: string;
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
  name: string;
  geoActions: GeoAction[];
};

export type GeoAction = {
  id: number;
  name: string;
};

export type GeoActionCreateInput = {
  name: string;
};

export type GeoPointCreateInput = {
  latitude: number;
  longitude: number;
};

export type GeoObjectCreateInput = {
  type: string;
  name: string;
  points?: GeoPointCreateInput[];
};
