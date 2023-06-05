import { useQuery } from 'react-query';
import {
  GeoActionCreateInput,
  GeoObject,
  GeoObjectCreateInput,
  GeoPoint,
  Log,
} from './types';

export const useLogs = () => {
  return useQuery<Log[], Error>('logs', async () => {
    const response = await fetch(`http://localhost:8000/logs`);
    return response.json();
  });
};

export const useMqttConnectionStatus = () => {
  return useQuery<{ connected: boolean }, Error>(
    'kafka-connection-status',
    async () => {
      const response = await fetch(`http://localhost:8000/mqtt-module/status`);
      return response.json();
    },
  );
};

export const useGeoObjects = () => {
  return useQuery<GeoObject[], Error>('geo-objects', async () => {
    const response = await fetch(`http://localhost:8000/geo`);
    return response.json();
  });
};

export const postGeoObject = async (data: GeoObjectCreateInput) => {
  const response = await fetch(`http://localhost:8000/geo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: data.type,
      points: {
        create: data.points,
      },
    }),
  });
  return response.json();
};

export const postGeoAction = async (
  geoPointId: number,
  geoAction: GeoActionCreateInput,
): Promise<GeoPoint> => {
  const response = await fetch(
    `http://localhost:8000/geo/point/actions/${geoPointId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(geoAction),
    },
  );
  return response.json();
};