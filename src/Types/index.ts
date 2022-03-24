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

export interface ContactFormData extends Omit<Contact, 'profilePic'> {
  profilePicFile?: File | null;
}

export interface ContactFormProps extends Contact {
  actionText: string;
  isLoading?: boolean;
  showUseWalletSwitch?: boolean;
  askAddress: boolean;
  onSubmit: (values: ContactFormData) => void;
}

export interface ContactPanelProps {
  contact: Contact;
}

export interface CreateContactModalProps {
  showUseWalletSwitch: boolean;
}

export interface ContactListItemProps {
  contact: Contact;
}

export interface ClipboardButtonProps extends IconButtonProps {
  text: string;
}

export interface AccountContextProps {
  account: ethers.Wallet | string | null;
  provider: ethers.providers.Web3Provider | null;
  isLoading: boolean;
  connectWallet: () => void;
}

export interface DeleteContactModalProps {
  docId: string;
}

export interface UpdateContactPanelProps extends ContactPanelProps {
  onClose: () => void;
}
