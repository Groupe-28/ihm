import { useQuery } from 'react-query';
import { Log } from './types';

export const useLogs = () => {
  return useQuery<Log[], Error>('logs', async () => {
    const response = await fetch(`http://localhost:8000/logs`);
    return response.json();
  });
};

export const useKafkaConnectionStatus = () => {
  return useQuery<{ connected: boolean }, Error>(
    'kafka-connection-status',
    async () => {
      const response = await fetch(
        `http://localhost:8000/kafka-consumer/status`,
      );
      return response.json();
    },
  );
};
