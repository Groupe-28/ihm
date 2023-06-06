import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { DrawCreateEvent } from '@mapbox/mapbox-gl-draw';
import React from 'react';
import { postGeoObject } from '../../lib/api';
import { convertToCoordinates } from '../../lib/tsUtils';
import { GeoObject } from '../../lib/types';

export type CreateGeoObjectModalProps = {
  isOpen: boolean;
  event?: DrawCreateEvent;
  onClose: () => void;
  onGeoObjectCreated: (geoObject: GeoObject) => void;
};

export const CreateGeoObjectModal: React.FC<CreateGeoObjectModalProps> = ({
  isOpen: isOpenParams,
  event,
  onClose: onCloseParams,
  onGeoObjectCreated,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  React.useEffect(() => {
    isOpenParams ? onOpen() : onClose();
  }, [isOpenParams]);

  const onCreate = async () => {
    if (event && name) {
      const { features } = event;
      if (features.length > 0) {
        const feature = features[0];
        const { geometry } = feature;

        if (geometry.type !== 'GeometryCollection') {
          const response = await postGeoObject({
            type: geometry.type,
            name: name,
            points: convertToCoordinates(geometry.coordinates),
          });

          onGeoObjectCreated(response);
        }
      }
    } else {
      setError('Name is required');
    }
  };

  const [name, setName] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a new geo object</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            errorBorderColor="red.300"
            isInvalid={error !== ''}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onCloseParams}>
            Close
          </Button>
          <Button colorScheme="blue" mr={3} onClick={onCreate}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
