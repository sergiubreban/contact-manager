import { IconButtonProps } from '@chakra-ui/react';
import { ethers } from 'ethers';

export type Contact = {
  id?: string;
  name?: string;
  publicAddress?: string;
  lastName?: string;
  phone?: string;
  age?: number;
  website?: string;
  tags?: string[];
  email?: string;
  profilePic?: string;
};

export interface ContactFromData extends Omit<Contact, 'profilePic'> {
  profilePicFile?: File;
}

export interface ContactFormProps extends Contact {
  distinctTags?: string[];
  onSubmit: (values: ContactFromData) => void;
}

export interface ContactPanelProps {
  contact: Contact;
}

export interface CreateContactModalProps {
  distinctTags?: string[];
}

export interface ContactListItemProps {
  contact: Contact;
}

export interface ClipboardButtonProps extends IconButtonProps {
  text: string;
}

export interface AccountContextProps {
  account: ethers.Wallet | null;
  provider: ethers.providers.Web3Provider | null;
  isLoading: boolean;
  connectWallet: () => void;
}
