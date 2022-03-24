import {
  Button,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useAppToast, useContactDocRef } from '../../Hooks';
import { MdDelete } from 'react-icons/md';
import { deleteDoc } from 'firebase/firestore';
import { DeleteContactModalProps } from '../../Types';

const DeleteContactModal = ({ docId }: DeleteContactModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const contactModelRef = useContactDocRef(docId);
  const toast = useAppToast();
  const { t } = useTranslation();

  const confirmDelete = async () => {
    try {
      await deleteDoc(contactModelRef);
      toast({
        title: t('Contact deleted!'),
        status: 'success',
      });
    } catch (error) {
      toast({
        title: t('There was an unexpected error. Please try again.'),
        status: 'error',
      });
    }
  };

  return (
    <>
      <IconButton size="sm" onClick={onOpen} data-testid="modal-btn" aria-label="delete contact" icon={<MdDelete />} />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('Delete Contact')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{t('You are about to delete a document. Are you sure?')}</Text>
            <Flex direction="row-reverse" mt={4} gap="2">
              <Button size="sm" onClick={onClose}>
                {t('Cancel')}
              </Button>
              <Button data-testid="confirm-btn" size="sm" colorScheme="red" onClick={confirmDelete}>
                {t('Delete')}
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteContactModal;
