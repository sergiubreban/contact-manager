import { useState } from 'react';
import {
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { addDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { useTranslation } from 'react-i18next';
import { useAppToast, useMetamask, useNewContactRef, useStorage } from '../../Hooks';
import { ContactFormData, CreateContactModalProps } from '../../Types';
import { IoIosAddCircle } from 'react-icons/io';
import ContactForm from '../ContactForm';

const CreateContactModal = ({ showUseWalletSwitch }: CreateContactModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const contactModelRef = useNewContactRef();
  const storage = useStorage();
  const toast = useAppToast();
  const { account } = useMetamask();
  const { t } = useTranslation();

  const submitNewContact = async (form: ContactFormData) => {
    setIsLoading(true);
    const { profilePicFile, ...fields } = form;

    try {
      let storagePath = '';

      if (profilePicFile) {
        const profilePicRef = ref(storage, profilePicFile.name);

        const storageResponse = await uploadBytes(profilePicRef, profilePicFile);

        storagePath = storageResponse.metadata.fullPath;
      }

      const isOwnerOfContact = account?.toString() === fields.publicAddress?.toLowerCase();
      addDoc(contactModelRef, {
        ...fields,
        ...(isOwnerOfContact && { verified: true }),
        profilePic: storagePath,
      });

      toast({
        title: t('Contact saved!'),
        status: 'success',
      });

      onClose();
    } catch (error) {
      toast({
        title: t('There was an unexpected error. Please try again.'),
        status: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <IconButton
        size="sm"
        mt="2"
        onClick={onOpen}
        data-testid="modal-btn"
        aria-label="add contact"
        icon={<IoIosAddCircle size="1.2rem" />}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('New Contact')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ContactForm
              askAddress={true}
              actionText={t('Add')}
              onSubmit={submitNewContact}
              showUseWalletSwitch={showUseWalletSwitch}
              isLoading={isLoading}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateContactModal;
