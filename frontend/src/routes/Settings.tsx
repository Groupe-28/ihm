import { Box, Button, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { BiLink } from 'react-icons/bi';
import { HiOutlineUser } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';

import { Outlet } from 'react-router-dom';

export function Settings() {
  return (
    <Flex
      direction="row"
      justify={'top'}
      align={'start'}
      width="full"
      height="full"
      gap={2}
    >
      <Flex
        direction={'column'}
        justify={'start'}
        align={'left'}
        width={'15%'}
        height={'100%'}
        bg={'brand.700'}
      >
        <Heading
          textAlign={'left'}
          p={4}
          my={3}
          mx={1}
          fontWeight={'bold'}
          fontSize={'xl'}
          color={'white'}
          opacity={0.9}
        >
          Settings
        </Heading>
        <Flex direction={'column'} align={'left'} justify={'top'} gap={0} p={2}>
          <LinkItem
            name={'Profile'}
            icon={HiOutlineUser}
            to={'/settings/user'}
          />
          <LinkItem name={'Devices'} icon={BiLink} to={'/settings/devices'} />
        </Flex>
      </Flex>
      <Box>
        <Outlet />
      </Box>
    </Flex>
  );
}

type LinkItemProps = {
  name: string;
  icon: IconType;
  to: string;
};

const LinkItem = ({ name, icon, to }: LinkItemProps) => {
  return (
    <Button
      width={'100%'}
      as={NavLink}
      to={to}
      variant="ghost"
      _hover={{ bg: 'brand.700' }}
      _activeLink={{
        fontWeight: 'bold',
        color: 'white',
        opacity: 1,
        bg: 'whiteAlpha.300',
      }}
      opacity={0.6}
      color={'white'}
      textAlign={'left'}
    >
      <Flex
        width={'100%'}
        direction="row"
        gap={2}
        align={'center'}
        justify={'start'}
      >
        <Icon as={icon} boxSize={5} />
        <Text fontWeight={'regular'}>{name}</Text>
      </Flex>
    </Button>
  );
};
