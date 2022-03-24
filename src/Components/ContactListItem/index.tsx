import { AccordionButton, AccordionItem, AccordionPanel, Flex, Text, Tooltip } from '@chakra-ui/react';
import { ContactListItemProps } from '../../Types';
import { MdEmail, MdSmartphone } from 'react-icons/md';
import { BsFillWalletFill } from 'react-icons/bs';
import ClipboardButton from '../ClipboardButton';
import ContactPanel from '../ContactPanel';
import { MdVerifiedUser } from 'react-icons/md';
import { GoUnverified } from 'react-icons/go';
import { useTranslation } from 'react-i18next';
import { shortenAddress } from '../../Utils';

const VerifiedIcon = () => {
  const { t } = useTranslation();
  return (
    <Tooltip label={t('This contact is verified. The address owner did update the information!')}>
      <span>
        <MdVerifiedUser color="green" />
      </span>
    </Tooltip>
  );
};

const UnverifiedIcon = () => {
  const { t } = useTranslation();
  return (
    <Tooltip label={t('The community added this contact. You can update the information if you think it is outdated!')}>
      <span>
        <GoUnverified />
      </span>
    </Tooltip>
  );
};

const ContactListItem = ({ contact }: ContactListItemProps) => {
  const { name, lastName, publicAddress, phone, email, verified } = contact;

  return (
    <AccordionItem border={'1px solid gray'} m="2" borderRadius="10px">
      <AccordionButton>
        <Flex justify="space-between" w="100%">
          <Flex alignItems="center" gap="2" flexWrap={'wrap'}>
            {verified ? <VerifiedIcon /> : <UnverifiedIcon />}
            <Text data-testid="contact-heading__name">{name}</Text>
            <Text data-testid="contact-heading__last-name">{lastName}</Text>
            <Text data-testid="contact-heading__public-address">
              {publicAddress && shortenAddress(publicAddress.toString())}
            </Text>
          </Flex>
          <Flex gap="2">
            <ClipboardButton
              data-testid="action-button__email"
              text={email ?? ''}
              aria-label="Copy Email"
              icon={<MdEmail />}
            />
            <ClipboardButton
              data-testid="action-button__phone"
              text={phone ?? ''}
              aria-label="Copy phone"
              icon={<MdSmartphone />}
            />
            <ClipboardButton
              data-testid="action-button__wallet-address"
              text={publicAddress?.toString() ?? ''}
              aria-label="Copy wallet address"
              icon={<BsFillWalletFill />}
            />
          </Flex>
        </Flex>
      </AccordionButton>
      <AccordionPanel pb="4">
        <ContactPanel contact={contact} />
      </AccordionPanel>
    </AccordionItem>
  );
};

export default ContactListItem;
