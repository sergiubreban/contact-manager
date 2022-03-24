import { Accordion, Center, Container, Flex, Heading, Skeleton, Stack, Text } from '@chakra-ui/react';
import { DocumentData } from 'firebase/firestore';
import { useMemo } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useTranslation } from 'react-i18next';
import { useContactRef, useMetamask } from '../../Hooks';
import ContactListItem from '../ContactListItem';
import CreateContactModal from '../CreateContactModal';

const ContactList = () => {
  const contactModelRef = useContactRef();
  const [value, loading, error] = useCollection(contactModelRef);
  const { account } = useMetamask();
  const { t } = useTranslation();

  const distinctTags = useMemo(
    () =>
      value &&
      value.docs
        .map((doc) => doc.data()?.tags ?? [])
        .flat()
        .filter((tag, index, self) => self?.indexOf(tag) === index),
    [value]
  );

  const documents = useMemo(() => {
    if (!value) {
      return [];
    }

    const documents: DocumentData[] = [];

    // map and sort data in one loop
    for (let i = 0; i < value.docs.length; i++) {
      const doc = value.docs[i];
      const data = doc.data();
      const isUserContact = !!account && data?.publicAddress === account.toString();
      const indexToInsert = isUserContact ? 0 : documents.length;
      const parsedDocument = { ...data, id: doc.id };

      documents.splice(indexToInsert, 0, parsedDocument);
    }

    return documents;
  }, [value, account]);

  const hasAccountVerified = !!account && documents.find((doc) => doc?.publicAddress === account.toString())?.verified;

  return (
    <Container>
      <Center p="3rem">
        <Flex alignItems="center" gap="4">
          <Heading>{t('Contacts')}</Heading>
          <CreateContactModal distinctTags={distinctTags} showUseWalletSwitch={!hasAccountVerified} />
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
          {documents.map((doc) => (
            <ContactListItem key={doc.id} contact={doc} />
          ))}
        </Accordion>
      )}
    </Container>
  );
};

export default ContactList;
