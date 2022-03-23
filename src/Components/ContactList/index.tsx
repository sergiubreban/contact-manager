import { Accordion, Center, Container, Flex, Heading, Skeleton, Stack, Text } from '@chakra-ui/react';
import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useTranslation } from 'react-i18next';
import { useFirestore } from '../../Hooks';
import ContactListItem from '../ContactListItem';
import CreateContactModal from '../CreateContactModal';

const ContactList = () => {
  const firestore = useFirestore();
  const [value, loading, error] = useCollection(collection(firestore, 'Contact'));
  const { t } = useTranslation();

  return (
    <Container>
      <Center p='3rem'>
        <Flex alignItems='center' gap='4'>
          <Heading>{t('Contacts')}</Heading>
          <CreateContactModal />
        </Flex>
      </Center>
      {error && <strong data-testid='contacts--error'>{t('Error:')} {JSON.stringify(error)}</strong>}
      {loading && <Stack spacing='2' data-testid='contacts--loading'>
        <Text>{t('Loading...')}</Text>
        <Skeleton height='40px' />
        <Skeleton height='40px' />
        <Skeleton height='40px' />
        <Skeleton height='40px' />
      </Stack>}
      {value && (
        <Accordion allowMultiple data-testid='contacts--fetched'>
          {value.docs.map((doc) => <ContactListItem key={doc.id} contact={doc.data()} />)}
        </Accordion>
      )}
    </Container>
  );
};

export default ContactList;