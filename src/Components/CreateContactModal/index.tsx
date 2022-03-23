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
import { useContactRef, useStorage } from '../../Hooks';
import { ContactFromData } from '../../types';
import { IoIosAddCircle } from 'react-icons/io';
import ContactForm from '../ContactForm';

const CreateContactModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  const contactModelRef = useContactRef();
  const storage = useStorage();

  const submitNewContact = async (form: ContactFromData) => {
    const { profilePicFile, ...fields } = form;

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
          <ModalHeader>{t('Modal Title')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ContactForm onSubmit={submitNewContact} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateContactModal;
