import { ChakraProvider } from '@chakra-ui/react';
import ContactList from './Components/ContactList';
import Layout from './Components/Layout';
import AccountProvider from './Context';
import { appTheme } from './Utils';
import './i18n';

export const App = () => (
  <ChakraProvider theme={appTheme}>
    <AccountProvider>
      <Layout>
        <ContactList />
      </Layout>
    </AccountProvider>
  </ChakraProvider>
);
