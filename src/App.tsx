import { ChakraProvider } from '@chakra-ui/react';
import ContactList from './Components/ContactList';
import Layout from './Components/Layout';
import AccountProvider from './Context/WalletAccount';
import { appTheme } from './Utils';
import { ContactProvider } from './Context/Contacts';
import './i18n';

export const App = () => (
  <ChakraProvider theme={appTheme}>
    <AccountProvider>
      <ContactProvider>
        <Layout>
          <ContactList />
        </Layout>
      </ContactProvider>
    </AccountProvider>
  </ChakraProvider>
);
