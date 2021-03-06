import { useEffect, useMemo, useState } from 'react';
import { Avatar, Center, Flex, Stack, Tag, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { getDownloadURL, ref } from 'firebase/storage';
import { useStorage } from '../../Hooks';
import { ContactPanelProps } from '../../Types';
import { shortenAddress } from '../../Utils';

const DisplayContactPanel = ({ contact }: ContactPanelProps) => {
  const { name, lastName, publicAddress, phone, email, tags, profilePic } = contact;
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

  const tagsToDisplay = useMemo(() => {
    if (!tags?.length) {
      return null;
    }

    return (
      <Flex alignItems="center" gap="1" as="span">
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </Flex>
    );
  }, [tags]);

  return (
    <Flex flexWrap="wrap">
      <Stack py="2" flex="1" minW="200px" fontSize="18px">
        <Flex gap="2">
          <Text>{t('Wallet')}:</Text>
          <Text data-testid="contact-data">{(publicAddress && shortenAddress(publicAddress)) || t('n/a')}</Text>
        </Flex>
        <Flex gap="2">
          <Text>{t('Name')}:</Text>
          <Text data-testid="contact-data">{name || t('n/a')}</Text>
        </Flex>
        <Flex gap="2">
          <Text>{t('LastName')}:</Text>
          <Text data-testid="contact-data">{lastName || t('n/a')}</Text>
        </Flex>
        <Flex gap="2">
          <Text>{t('Email')}:</Text>
          <Text data-testid="contact-data">{email || t('n/a')}</Text>
        </Flex>
        <Flex gap="2">
          <Text>{t('Phone')}:</Text>
          <Text data-testid="contact-data">{phone || t('n/a')}</Text>
        </Flex>
        <Flex gap="2">
          <Text>{t('Age')}:</Text>
          <Text data-testid="contact-data">{contact.age || t('n/a')}</Text>
        </Flex>
        <Flex gap="2">
          <Text>{t('Website')}:</Text>
          <Text data-testid="contact-data">{contact.website || t('n/a')}</Text>
        </Flex>
        <Flex gap="2" alignItems="center">
          <Text>{t('Tags')}:</Text>
          <Text data-testid="contact-data">{tagsToDisplay ?? t('n/a')}</Text>
        </Flex>
      </Stack>
      <Center w="300px">
        <Avatar size="2xl" name={name} src={avatarLink} />{' '}
      </Center>
    </Flex>
  );
};

export default DisplayContactPanel;
