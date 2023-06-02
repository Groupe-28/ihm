export type Log = {
  id: number;
  content: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

export type GeoObject = {
  id: number;
  type: string;
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
