import { Button, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMetamask } from '../../Hooks';
import { ContactPanelProps } from '../../Types';
import DisplayContactPanel from './DisplayPanel';
import UpdateContactPanel from './UpdatePanel';

const DisplayPanel = (props: ContactPanelProps) => {
  const { contact } = props;
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const { account } = useMetamask();
  const { t } = useTranslation();

  const isUserContact = !!account && contact?.publicAddress === account.toString();

  return (
    <Stack>
      {showUpdateForm ? (
        <UpdateContactPanel contact={contact} onClose={() => setShowUpdateForm(false)} />
      ) : (
        <>
          <DisplayContactPanel contact={contact} />
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
