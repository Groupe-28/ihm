import {
  Box,
  Flex,
  Heading,
  useDisclosure,
  Badge,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  Card,
  useColorMode,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Icon,
  ButtonGroup,
  DrawerFooter,
} from '@chakra-ui/react';

import { Table as TableComponent } from '../components';
import { AiFillPlayCircle } from 'react-icons/ai';
import { MdCancel } from 'react-icons/md';
import { PointMarker } from '../components/geo/GeoObjectPanel';
import { deleteGeoObject, useGeoObjects } from '../lib/api';
import { GeoObject, GeoPoint } from '../lib/types';
import { useState } from 'react';
import { colors } from '../theme';

export const Workers = () => {
  const { data: geoObjects } = useGeoObjects();
  const {
    isOpen: isOpenDrawer,
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
  } = useDisclosure();
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  const { colorMode } = useColorMode();
  const [currentWorker, setCurrentWorker] = useState<GeoObject | null>(null);
  const [currentPoint, setCurrentPoint] = useState<GeoPoint | null>(null);

  const openDrawer = (id: number) => {
    const currentGeoObject = geoObjects?.find(
      (geoObject) => geoObject.id === id,
    );

    setCurrentWorker(currentGeoObject ?? null);
    onOpenDrawer();
  };

  const openModal = (id: number) => {
    const currentPoint = currentWorker?.points.find((point) => point.id === id);

    setCurrentPoint(currentPoint ?? null);
    onOpenModal();
  };

  const deleteWorker = () => {
    if (currentWorker) {
      deleteGeoObject(currentWorker.id);
      onCloseDrawer();
    }
  };

  const formattedWorkers = geoObjects?.map((geoObject) => ({
    ...geoObject,
    points: geoObject.points.length,
  }));

  return (
    <>
      <Modal isOpen={isOpenModal} onClose={onCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Actions</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Id</Th>
                    <Th>Name</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {currentPoint?.geoActions.map((action, index) => (
                    <Tr key={index}>
                      <Td>{action.id}</Td>
                      <Td>{action.name}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onCloseModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Drawer
        isOpen={isOpenDrawer}
        placement="right"
        onClose={onCloseDrawer}
        size={'lg'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader backgroundColor={colors.brand[500]} color={'white'}>
            {currentWorker?.name}
          </DrawerHeader>
          <DrawerBody>
            <Flex
              gap={3}
              direction="row"
              className="py-3"
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              {currentWorker && (
                <Text size="md" fontWeight={'bold'}>
                  Created at:{' '}
                  {new Date(currentWorker?.createdAt).toLocaleString()}
                </Text>
              )}
              <ButtonGroup>
                <Button colorScheme="green">
                  <Icon as={AiFillPlayCircle} />
                </Button>
                <Button colorScheme="red">
                  <Icon as={MdCancel} />
                </Button>
              </ButtonGroup>
            </Flex>

            <Flex gap={0} direction="column">
              {currentWorker &&
                currentWorker.points.map((point, index) => (
                  <Flex
                    direction="row"
                    className="w-full"
                    gap={3}
                    key={point.id}
                    alignItems={'stretch'}
                    justifyContent={'center'}
                  >
                    <PointMarker text={index + 1} />
                    <Card
                      className="w-full p-3 my-2"
                      border={'1px solid'}
                      size={'sm'}
                      borderColor={
                        colorMode === 'dark'
                          ? colors.default[600]
                          : colors.default[100]
                      }
                    >
                      <TableContainer>
                        <Table
                          size={'sm'}
                          variant="simple"
                          onClick={() => {
                            point.geoActions.length && openModal(point.id);
                          }}
                        >
                          <Tbody>
                            <Tr>
                              <Td fontWeight={'bold'}>Latitude</Td>
                              <Td>{point.latitude}</Td>
                            </Tr>
                            <Tr>
                              <Td fontWeight={'bold'}>Longitude</Td>
                              <Td>{point.longitude}</Td>
                            </Tr>
                            <Tr>
                              <Td fontWeight={'bold'}>Actions</Td>
                              <Td>{point.geoActions.length}</Td>
                            </Tr>
                            <Tr>
                              <Td fontWeight={'bold'}>Status</Td>
                              <Td>
                                <span className="relative flex h-3 w-3">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                              </Td>
                            </Tr>
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </Card>
                  </Flex>
                ))}
            </Flex>
          </DrawerBody>
          <DrawerFooter
            borderTop={
              '1px solid' +
              (colorMode === 'dark' ? colors.default[600] : colors.default[100])
            }
          >
            <Button variant="outline" mr={3} onClick={onCloseDrawer}>
              Close
            </Button>
            <Button colorScheme="red" mr={3} onClick={deleteWorker}>
              Delete
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Flex direction={'column'} className="w-full h-full">
        <Flex
          direction={'row'}
          className="w-full"
          align={'center'}
          justify={'space-between'}
          p={3}
        >
          <Heading>Workers</Heading>
          <Badge colorScheme={geoObjects?.length ? 'green' : 'red'}>
            {geoObjects?.length}
          </Badge>
        </Flex>
        <Box className="w-full h-full p-3">
          <TableComponent
            rows={formattedWorkers ?? []}
            onRowClick={(geoObject) => {
              openDrawer(geoObject.id);
            }}
          ></TableComponent>
        </Box>
      </Flex>
    </>
  );
};
