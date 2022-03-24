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
  verified?: boolean;
};

export interface ContactFromData extends Omit<Contact, 'profilePic'> {
  profilePicFile?: File;
}

export interface ContactFormProps extends Contact {
  isLoading?: boolean;
  distinctTags?: string[];
  verifyWallet?: boolean;
  onSubmit: (values: ContactFromData) => void;
}

export interface ContactPanelProps {
  contact: Contact;
}

export interface CreateContactModalProps {
  verifyWallet?: boolean;
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
