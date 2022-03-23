import { useEffect, useState } from 'react';
import { Center, Flex, Image, Stack, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { getDownloadURL, ref } from 'firebase/storage';
import { useStorage } from '../../Hooks';
import { Contact } from '../../types';
import { shortenAddress } from '../../Utils';

interface ContactPanelProps {
  contact: Contact;
}
const ContactPanel = ({ contact }: ContactPanelProps) => {
  const { name, lastName, publicAddress, phone, email, profilePic } = contact;
  const [avatarLink, setAvatarLink] = useState('');
  const storage = useStorage();
  const { t } = useTranslation();

  useEffect(() => {
    const getAvatar = async () => {
      const url = await getDownloadURL(ref(storage, profilePic));

      setAvatarLink(url);
    };

    if (profilePic) {
      getAvatar();
    }
  }, [profilePic, storage]);

  return (
    <Flex flexWrap="wrap">
      <Stack p="5" flex="1" minW="200px">
        <Flex gap="2">
          <Text>{t('Wallet Address')}:</Text>
          <Text data-testid="contact-data">{(publicAddress && shortenAddress(publicAddress)) || t('N/A')}</Text>
        </Flex>
        <Flex gap="2">
          <Text>{t('Name')}:</Text>
          <Text data-testid="contact-data">{name || t('N/A')}</Text>
        </Flex>
        <Flex gap="2">
          <Text>{t('LastName')}:</Text>
          <Text data-testid="contact-data">{lastName || t('N/A')}</Text>
        </Flex>
        <Flex gap="2">
          <Text>{t('Email')}:</Text>
          <Text data-testid="contact-data">{email || t('N/A')}</Text>
        </Flex>
        <Flex gap="2">
          <Text>{t('Phone')}:</Text>
          <Text data-testid="contact-data">{phone || t('N/A')}</Text>
        </Flex>
        <Flex gap="2">
          <Text>{t('Age')}:</Text>
          <Text data-testid="contact-data">{contact.age || t('N/A')}</Text>
        </Flex>
        <Flex gap="2">
          <Text>{t('Website')}:</Text>
          <Text data-testid="contact-data">{contact.website || t('N/A')}</Text>
        </Flex>
        <Flex gap="2">
          <Text>{t('Tags')}:</Text>
          <Text data-testid="contact-data">{contact.tags || t('N/A')}</Text>
        </Flex>
      </Stack>
      <Center w="300px">
        <Image src={avatarLink} w="100%" h="auto" />
      </Center>
    </Flex>
  );
};

export default ContactPanel;
