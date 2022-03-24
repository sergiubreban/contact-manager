import { Accordion, Center, Container, Flex, Heading, Skeleton, Stack, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useTranslation } from 'react-i18next';
import { useContactRef } from '../../Hooks';
import ContactListItem from '../ContactListItem';
import CreateContactModal from '../CreateContactModal';

const ContactList = () => {
  const contactModelRef = useContactRef();
  const [value, loading, error] = useCollection(contactModelRef);
  const { t } = useTranslation();

  const distinctTags = useMemo(
    () =>
      value &&
      value.docs
        .map((doc) => doc.data()?.tags ?? [])
        .flat()
        .filter((tag, index, self) => self.indexOf(tag) === index),
    [value]
  );

  return (
    <Container>
      <Center p="3rem">
        <Flex alignItems="center" gap="4">
          <Heading>{t('Contacts')}</Heading>
          <CreateContactModal distinctTags={distinctTags} />
        </Flex>
      </Center>
      {error && (
        <strong data-testid="contacts--error">
          {t('Error:')} {JSON.stringify(error)}
        </strong>
      )}
      {loading && (
        <Stack spacing="2" data-testid="contacts--loading">
          <Text>{t('Loading...')}</Text>
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
        </Stack>
      )}
      {value && (
        <Accordion allowMultiple data-testid="contacts--fetched">
          {value.docs.map((doc) => (
            <ContactListItem key={doc.id} contact={doc.data()} />
          ))}
        </Accordion>
      )}
    </Container>
  );
};

export default ContactList;
