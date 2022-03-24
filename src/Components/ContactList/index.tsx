import { useContext, useEffect, useMemo } from 'react';
import { Accordion, Center, Container, Flex, Heading, Skeleton, Stack, Text } from '@chakra-ui/react';
import { DocumentData } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useTranslation } from 'react-i18next';
import { useNewContactRef, useMetamask } from '../../Hooks';
import ContactListItem from '../ContactListItem';
import CreateContactModal from '../CreateContactModal';
import { ContactContext } from '../../Context/Contacts';

const ContactList = () => {
  const contactModelRef = useNewContactRef();
  const [value, loading, error] = useCollection(contactModelRef);
  const { account } = useMetamask();
  const { t } = useTranslation();
  const { setDistinctTags, setRegisteredAccounts } = useContext(ContactContext);

  const distinctTags = useMemo(() => {
    let tags: string[] = [];

    if (value) {
      tags = value.docs
        .map((doc) => doc.data()?.tags ?? [])
        .flat()
        .filter((tag, index, self) => self?.indexOf(tag) === index);
    }

    return tags;
  }, [value]);

  const [documents, hasAccountVerified] = useMemo(() => {
    if (!value) {
      return [[], false];
    }

    const documents: DocumentData[] = [];
    let userDocument: DocumentData | undefined;

    for (let i = 0; i < value.docs.length; i++) {
      const doc = value.docs[i];
      const data = doc.data();
      const isUserContact = !!account && data?.publicAddress === account.toString();
      const parsedDocument = { ...data, id: doc.id };

      if (isUserContact) {
        userDocument = parsedDocument;
      } else {
        documents.push(parsedDocument);
      }
    }

    if (userDocument) {
      documents.unshift(userDocument);
    }

    return [documents, !!account && userDocument?.verified];
  }, [value, account]);

  useEffect(() => setDistinctTags(distinctTags), [distinctTags, setDistinctTags]);
  useEffect(
    () => setRegisteredAccounts(documents.map((doc) => doc.publicAddress?.toLowerCase())),
    [documents, setRegisteredAccounts]
  );

  return (
    <Container>
      <Center p="3rem">
        <Flex alignItems="center" gap="4">
          <Heading>{t('Contacts')}</Heading>
          <CreateContactModal showUseWalletSwitch={!hasAccountVerified} />
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
