import { Flex, Text } from '../../common';
import { TSideBarProps } from './types';

export const SideBar = ({}: TSideBarProps) => {
  return (
    <Flex orientation="col" fullSize>
      <Text>SideBar</Text>
    </Flex>
  );
};
