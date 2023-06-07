import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export interface LocalizationData {
  latitude: number;
  longitude: number;
}

const useRobotLocalization = (): {
  data: LocalizationData | null;
  error: string | null;
  isConnected: boolean;
} => {
  const [data, setData] = useState<LocalizationData | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false); // [1
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const socket = io('http://localhost:8000/geo');

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      setData(null);
    });

    socket.on('localization', (data: LocalizationData) => {
      setIsConnected(true);
      setData(data);
    });

    socket.on('error', (error: string) => {
      setIsConnected(false);
      setData(null);
      setError(error);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return { data, error, isConnected };
};

export default useRobotLocalization;
