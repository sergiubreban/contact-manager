import { Button, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMetamask } from '../../Hooks';
import { ContactPanelProps } from '../../Types';
import DsiplayContactPanel from './DisplayPanel';
import UpdateContactPanel from './UpdatePanel';

const DisplayPanel = (props: ContactPanelProps) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const { contact } = props;
  const { account } = useMetamask();
  const isUserContact = !!account && contact?.publicAddress === account.toString();

  const { t } = useTranslation();
  return (
    <Stack>
      {showUpdateForm ? (
        <UpdateContactPanel contact={contact} onClose={() => setShowUpdateForm(false)} />
      ) : (
        <>
          <DsiplayContactPanel contact={contact} />
          {(!contact.verified || isUserContact) && (
            <Button size="sm" onClick={() => setShowUpdateForm(true)} colorScheme="blue" alignSelf="flex-end">
              {t('Update')}
            </Button>
          )}
        </>
      )}
    </Stack>
  );
};

export default DisplayPanel;
