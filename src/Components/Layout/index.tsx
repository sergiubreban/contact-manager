import { Box, Flex } from '@chakra-ui/react';
import { FC } from 'react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';

const Layout: FC = (props) => {
  return (
    <Box textAlign="center" fontSize="xl">
      <Flex p="5" gap="5" direction="row-reverse" justifySelf="flex-end">
        <ColorModeSwitcher />
      </Flex>
      {props.children}
    </Box>
  );
};

export default Layout;
