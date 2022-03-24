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
import { useAppToast, useContactRef, useStorage } from '../../Hooks';
import { ContactFormData, CreateContactModalProps } from '../../Types';
import { IoIosAddCircle } from 'react-icons/io';
import ContactForm from '../ContactForm';

const CreateContactModal = ({ distinctTags, showUseWalletSwitch }: CreateContactModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const contactModelRef = useContactRef();
  const storage = useStorage();
  const toast = useAppToast();
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

      addDoc(contactModelRef, {
        ...fields,
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
        onClick={onOpen}
        data-testid="modal-btn"
        aria-label="add contact"
        icon={<IoIosAddCircle />}
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
              distinctTags={distinctTags}
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
