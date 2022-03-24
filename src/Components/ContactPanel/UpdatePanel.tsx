import { ContactFromData, ContactPanelProps } from '../../Types';
import { useState } from 'react';
import ContactForm from '../ContactForm';
import { ref, uploadBytes } from 'firebase/storage';
import { useAppToast, useFirestore, useStorage } from '../../Hooks';
import { doc, updateDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';

interface UpdateContactPanelProps extends ContactPanelProps {
  onClose: () => void;
}
const UpdateContactPanel = ({ contact, onClose }: UpdateContactPanelProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useAppToast();
  const firestore = useFirestore();
  const { t } = useTranslation();

  const storage = useStorage();
  const handleContacUpdate = async (form: ContactFromData) => {
    setIsLoading(true);
    const { profilePicFile, ...fields } = form;

    try {
      let storagePath = '';

      if (profilePicFile) {
        const profilePicRef = ref(storage, profilePicFile.name);

        const storageResponse = await uploadBytes(profilePicRef, profilePicFile);

        storagePath = storageResponse.metadata.fullPath;
      }

      updateDoc(doc(firestore, 'Contact', contact.id!), {
        ...fields,
        ...(storagePath && { profilePic: storagePath }),
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
    <ContactForm
      id={contact.id}
      name={contact.name}
      lastName={contact.lastName}
      website={contact.website}
      age={contact.age}
      publicAddress={contact.publicAddress}
      phone={contact.phone}
      verified={contact.verified}
      tags={contact.tags}
      email={contact.email}
      profilePic={contact.profilePic}
      onSubmit={handleContacUpdate}
      isLoading={isLoading}
      actionText={t('Update')}
      askAddress={false}
    />
  );
};

export default UpdateContactPanel;
