import { AccordionButton, AccordionItem, AccordionPanel, Flex, Text } from "@chakra-ui/react";
import { FC, } from "react";
import { Contact } from "../../types";
import { MdEmail, MdSmartphone } from 'react-icons/md';
import { BsFillWalletFill } from 'react-icons/bs';
import ClipboardButton from "../ClipboardButton";
import ContactPanel from "../ContactPanel";


const ContactListItem: FC<{ contact: Contact }> = ({ contact }) => {
  const { name, lastName, publicAddress, phone, email } = contact;

  return (
    <AccordionItem border={'1px solid gray'} m='2'>
      <AccordionButton >
        <Flex justify='space-between' w='100%'>
          <Flex>
            <Text data-testid='contact-heading__name'>{name}</Text>
            <Text data-testid='contact-heading__last-name'>{lastName}</Text>
          </Flex>
          <Flex gap='2'>
            <ClipboardButton data-testid='action-button__email' text={email ?? ''} aria-label='Copy Email' icon={<MdEmail />} />
            <ClipboardButton data-testid='action-button__phone' text={phone ?? ''} aria-label='Copy phone' icon={<MdSmartphone />} />
            <ClipboardButton data-testid='action-button__wallet-address' text={publicAddress ?? ''} aria-label='Copy wallet address' icon={<BsFillWalletFill />} />
          </Flex>
        </Flex>
      </AccordionButton>
      <AccordionPanel pb='4'>
        <ContactPanel contact={contact} />
      </AccordionPanel>
    </AccordionItem>
  );
}


export default ContactListItem;