import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import ContactList from './Components/ContactList';
import Layout from './Components/Layout';
import AccountProvider from './Context';
import { appTheme } from './Utils';

export const App = () => (
  <ChakraProvider theme={appTheme}>
    <AccountProvider>
      <Layout>
        <ContactList />
      </Layout>
    </AccountProvider>
  </ChakraProvider>
);
