import { IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useFirestore, useStorage } from "../../Hooks";
import { ContactFromData } from "../../types";
import { IoIosAddCircle } from "react-icons/io";
import ContactForm from "../ContactForm";

const CreateContactModal: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { t } = useTranslation();
  const firestore = useFirestore();
  const contactModelRef = collection(firestore, 'Contact')
  const storage = useStorage();

  const submitNewContact = async (form: ContactFromData) => {
    const { profilePicFile, ...fields } = form;

    let storagePath = '';
    if (profilePicFile) {
      const refa = ref(storage, profilePicFile.name)

      const storageResponse = await uploadBytes(refa, profilePicFile);

      storagePath = storageResponse.metadata.fullPath
    }

    addDoc(contactModelRef, {
      ...fields,
      profilePic: storagePath
    });
  }

  return (
    <>
      <IconButton size='sm' onClick={onOpen} data-testid='modal-btn' aria-label="add contact" icon={<IoIosAddCircle />} />
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
  )
}


export default CreateContactModal;
