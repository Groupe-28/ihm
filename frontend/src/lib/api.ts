import { useQuery } from 'react-query';
import { Log } from './types';

export const useLogs = () => {
  return useQuery<Log[], Error>('logs', async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/logs`);
    return response.json();
  });
};
