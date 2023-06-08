import { Card, Flex, Text } from '@chakra-ui/react';
import React from 'react';

export type TConnectionCardProps = {
  items: {
    name: string;
    value: boolean;
    labelConnected?: string;
    labelDisconnected?: string;
  }[];
};

export const ConnectionCard: React.FC<TConnectionCardProps> = ({ items }) => {
  return (
    <Card
      padding={3}
      display={'flex'}
      direction={'column'}
      gap={3}
      alignItems={'start'}
      justifyContent={'center'}
    >
      {items.map((item) => (
        <Flex
          display={'flex'}
          direction={'row'}
          gap={2}
          alignItems={'center'}
          justifyContent={'center'}
        >
          {item.value ? (
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          ) : (
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          )}
          <Text fontWeight={'bold'} lineHeight={'10px'}>
            {item.value
              ? item.labelConnected ?? 'Connected'
              : item.labelDisconnected ?? 'Disconnected'}
          </Text>
        </Flex>
      ))}
    </Card>
  );
};
