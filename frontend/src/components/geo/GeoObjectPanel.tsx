import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  ButtonGroup,
  Card,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useColorMode,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { postGeoAction } from '../../lib/api';
import { GeoActionCreateInput, GeoObject, GeoPoint } from '../../lib/types';
import { colors } from '../../theme';

export type TPanelProps = {
  geoObject?: GeoObject;
  isOpen: boolean;
  onClose: (geoObject?: GeoObject) => void;
};

export const GeoObjectPanel: React.FC<TPanelProps> = ({
  geoObject,
  isOpen: isOpenParams,
  onClose,
}) => {
  const toast = useToast();
  const [geoObjectState, setGeoObjectState] = React.useState<
    GeoObject | undefined
  >(geoObject);

  React.useEffect(() => {
    setGeoObjectState(geoObject);
  }, [geoObject]);

  const onClosePanel = () => {
    onClose(geoObject);
  };

  const handleActionCreation = async (
    pointId: number,
    action: GeoActionCreateInput,
  ) => {
    const data = await postGeoAction(pointId, action);
    if (data) {
      const updatedGeoObject = geoObjectState && {
        ...geoObjectState,
        points: geoObjectState?.points.map((point) => {
          if (point.id === pointId) {
            return data;
          }
          return point;
        }),
      };
      updatedGeoObject && setGeoObjectState(updatedGeoObject);
      toast({
        title: 'Action created.',
        description: 'Action was successfully created.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const { colorMode } = useColorMode();

  return (
    <Drawer
      isOpen={isOpenParams}
      placement="right"
      onClose={onClosePanel}
      size={'lg'}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader backgroundColor={colors.brand[500]} color={'white'}>
          {geoObjectState?.name}
        </DrawerHeader>

        <DrawerBody>
          <Flex gap={3} direction="row" className="py-3">
            {geoObjectState && (
              <>
                <Text size="md" fontWeight={'bold'}>
                  Created at:
                </Text>
                <Text size="md">
                  {new Date(geoObjectState?.createdAt).toLocaleString()}
                </Text>
              </>
            )}
          </Flex>

          <Flex gap={0} direction="column">
            {geoObjectState &&
              geoObjectState.points.map((point, index) => (
                <PointCard
                  point={point}
                  index={index}
                  onCreateActionButtonClicked={handleActionCreation}
                />
              ))}
          </Flex>
        </DrawerBody>

        <DrawerFooter
          borderTop={
            '1px solid' +
            (colorMode === 'dark' ? colors.default[600] : colors.default[100])
          }
        >
          <Button variant="outline" mr={3} onClick={onClosePanel}>
            Cancel
          </Button>
          <Button
            backgroundColor={colors.brand[500]}
            color={'white'}
            onClick={onClosePanel}
          >
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

const PointCard: React.FC<{
  point: GeoPoint;
  index: number;
  onCreateActionButtonClicked: (
    pointId: number,
    action: GeoActionCreateInput,
  ) => void;
}> = ({ point, index, onCreateActionButtonClicked }) => {
  const { colorMode } = useColorMode();

  return (
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
        borderColor={
          colorMode === 'dark' ? colors.default[600] : colors.default[100]
        }
      >
        <Flex gap={0} direction="column">
          <Flex
            gap={3}
            direction="row"
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <CreateActionModal
              pointId={point.id}
              onCreateActionButtonClicked={onCreateActionButtonClicked}
            />
          </Flex>
          {point.geoActions.length > 0 && (
            <Accordion
              allowMultiple
              mt={3}
              rounded={'md'}
              border={'transparent'}
            >
              <AccordionItem rounded={'md'}>
                <h2>
                  <AccordionButton
                    _expanded={{ bg: colors.default[500], color: 'white' }}
                    rounded={'md'}
                  >
                    <Box as="span" flex="1" textAlign="left">
                      Show related actions{' '}
                      <strong>({point.geoActions.length})</strong>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {point.geoActions.map((action, index) => (
                    <Text size="md" fontWeight={'bold'}>
                      {action.name}
                    </Text>
                  ))}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          )}
        </Flex>
      </Card>
    </Flex>
  );
};

const CreateActionModal: React.FC<{
  pointId: number;
  onCreateActionButtonClicked: (
    pointId: number,
    action: GeoActionCreateInput,
  ) => void;
}> = ({ pointId, onCreateActionButtonClicked }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const initialFocusRef = React.useRef<any>();
  const [inputValue, setInputValue] = React.useState<string>('');

  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      initialFocusRef={initialFocusRef}
      placement="left"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Button>Add new action</Button>
      </PopoverTrigger>
      <PopoverContent
        color="white"
        bg={colors.brand[700]}
        borderWidth={2}
        borderColor={'white'}
        boxShadow={'xlg'}
      >
        <PopoverHeader pt={4} fontWeight="bold" border="0">
          Create a new action
        </PopoverHeader>
        <PopoverArrow bg={colors.brand[700]} />
        <PopoverCloseButton />
        <PopoverBody>
          <Text mb={2}>Enter action name</Text>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            outline={'none'}
          />
        </PopoverBody>
        <PopoverFooter
          border="0"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          pb={4}
        >
          <Box fontSize="sm"></Box>
          <ButtonGroup size="sm">
            <Button
              variant="outline"
              ref={initialFocusRef}
              onClick={() => {
                onCreateActionButtonClicked(pointId, {
                  name: inputValue,
                });
                onClose();
              }}
            >
              Create Action
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export const PointMarker: React.FC<{
  text?: string | number;
}> = ({ text }) => {
  const { colorMode } = useColorMode();

  return (
    <Flex alignItems={'center'} justifyContent={'center'} direction={'column'}>
      <Box
        style={{
          width: '2px',
          height: '100%',
          borderLeft: `4px dotted ${colors.brand[500]}`,
          marginLeft: '2px',
          opacity: 0.5,
        }}
      />
      <Box>
        <div
          style={{
            width: '22px',
            height: '22px',
            textAlign: 'center',
            borderRadius: '50%',
            backgroundColor: colors.brand[500],
            marginLeft: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text fontSize={'xs'} fontWeight={'bold'} color={'white'}>
            {text}
          </Text>
        </div>
      </Box>
      <Box
        style={{
          width: '2px',
          height: '100%',
          borderLeft: `4px dotted ${colors.brand[500]}`,
          marginLeft: '2px',
          opacity: 0.5,
        }}
      />
    </Flex>
  );
};