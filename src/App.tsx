import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import ContactList from './Components/ContactList';
import Layout from './Components/Layout';
import AccountProvider from './Context';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

export const App = () => (
  <ChakraProvider theme={theme}>
    <AccountProvider>
      <Layout>
        <ContactList />
      </Layout>
    </AccountProvider>
  </ChakraProvider>
);
