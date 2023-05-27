import { Icon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Box, Button, Divider, Flex, useColorMode } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { BiStats } from 'react-icons/bi';
import { GiFarmer } from 'react-icons/gi';
import { HiHome, HiMap } from 'react-icons/hi';
import { IoIosSettings } from 'react-icons/io';
import { MdWorkspaces } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { TSideBarProps } from './types';

export const SideBar = ({}: TSideBarProps) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      direction="column"
      justify={'top'}
      align={'center'}
      width="16"
      height="full"
      gap={2}
      p={2}
      bg={'brand.800'}
    >
      <Icon my={3} mx={1} as={GiFarmer} boxSize={10} color={'white'} />
      <LinkItem name={'Home'} icon={HiHome} to={'/'} />
      <LinkItem name={'Workers'} icon={MdWorkspaces} to={'/workers'} />
      <LinkItem name={'Stats'} icon={BiStats} to={'/stats'} />
      <LinkItem name={'Map'} icon={HiMap} to={'/map'} />
      <Box mt={'auto'} />
      <LinkItem name={'Settings'} icon={IoIosSettings} to={'/settings'} />
      <Divider opacity={'0.2'} />
      <Button
        width={'100%'}
        onClick={toggleColorMode}
        variant={'ghost'}
        _hover={{ bg: 'brand.700' }}
        color={'white'}
      >
        <Flex direction="row" gap={2} justify={'space-between'}>
          {colorMode === 'light' ? (
            <Icon as={MoonIcon} boxSize={5} />
          ) : (
            <Icon as={SunIcon} boxSize={5} />
          )}
        </Flex>
      </Button>
    </Flex>
  );
};

type LinkItemProps = {
  name: string;
  icon: IconType;
  to: string;
};

export const LinkItem = ({ name, icon, to }: LinkItemProps) => {
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
        bg: 'brand.700',
      }}
      opacity={0.6}
      color={'white'}
    >
      <Flex direction="row" gap={2} justify={'space-between'}>
        <Icon as={icon} boxSize={5} />
      </Flex>
    </Button>
  );
};
