import {
  Badge,
  Box,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ReactJson from 'react-json-view';
import { Table as TableComponent } from '../components';
import { useLogs } from '../lib/api';
import { isJSONObject } from '../lib/tsUtils';
import { Log } from '../lib/types';
import { socket } from '../socket';

export const Logs = () => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isConnected, setIsConnected] = useState(false);
  const [logSelected, setLogSelected] = useState<Log | null>(null);
  const { data: logs } = useLogs();

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });
    socket.on('disconnect', () => {
      setIsConnected(false);
    });
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
        <TableComponent
          rows={logs ?? []}
          onRowClick={(log) => {
            setLogSelected(log);
            onOpen();
          }}
        />
      </Box>
      <Modal size={'5xl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading>Log</Heading>
          </ModalHeader>
          <ModalCloseButton />
          {logSelected && (
            <ModalBody>
              <Flex direction="row" justify="left" gap={2}>
                <Text fontWeight={'bold'}>Created at</Text>
                <Text>{new Date(logSelected?.createdAt).toLocaleString()}</Text>
              </Flex>
              <Flex direction="row" justify="left" gap={2}>
                <Text fontWeight={'bold'}>Title</Text>
                <Text>{logSelected?.title}</Text>
              </Flex>
              <Flex
                direction={isJSONObject(logSelected.content) ? 'column' : 'row'}
                justify="left"
                gap={2}
              >
                <Text fontWeight={'bold'}>Content</Text>
                {isJSONObject(logSelected.content) ? (
                  <ReactJson
                    theme={colorMode === 'dark' ? 'tube' : 'bright:inverted'}
                    src={JSON.parse(logSelected.content)}
                  />
                ) : (
                  <Text>{logSelected?.content}</Text>
                )}
              </Flex>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </Flex>
  );
};
