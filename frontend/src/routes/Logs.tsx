import { Badge, Box, Flex, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Table as TableComponent } from '../components';
import { socket } from '../socket';

type CoordinatesEvent = {
  lat: number;
  lng: number;
};

type SocketEvent = {
  name: string;
  date?: Date;
  value: CoordinatesEvent;
};

export const Logs = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [events, setEvents] = useState<SocketEvent[]>([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onCoordinatesEvent(value: CoordinatesEvent) {
      setEvents((events) => [
        ...events,
        { name: 'coordinates', date: new Date(), value },
      ]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('coordinates', onCoordinatesEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('coordinates', onCoordinatesEvent);
    };
  }, []);

  return (
    <Flex direction={'column'} className="w-full h-full">
      <Flex
        direction={'row'}
        className="w-full"
        align={'center'}
        justify={'space-between'}
        p={3}
      >
        <Heading>Logs</Heading>
        <Badge colorScheme={isConnected ? 'green' : 'red'}>
          {isConnected ? 'connected' : 'disconnected'}
        </Badge>
      </Flex>
      <Box className="w-full h-full p-3">
        <TableComponent rows={events} />
      </Box>
    </Flex>
  );
};
