import { Flex, IconButton, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { useMetamask } from '../../Hooks';
import { ContactPanelProps } from '../../Types';
import DeleteContactModal from '../DeleteContactModal';
import DisplayContactPanel from './DisplayPanel';
import UpdateContactPanel from './UpdatePanel';
import { MdEdit } from 'react-icons/md';

const DisplayPanel = (props: ContactPanelProps) => {
  const { contact } = props;
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const { account } = useMetamask();

  const isUserContact = !!account && contact?.publicAddress?.toLowerCase() === account.toString();
  const areActionsAvailable = !contact.verified || isUserContact;

  return (
    <Stack>
      {showUpdateForm ? (
        <UpdateContactPanel contact={contact} onClose={() => setShowUpdateForm(false)} />
      ) : (
        <>
          <DisplayContactPanel contact={contact} />
          {areActionsAvailable && (
            <Flex direction="row-reverse" gap="2">
              <DeleteContactModal docId={contact.id!} />
              <IconButton
                size="sm"
                onClick={() => setShowUpdateForm(true)}
                data-testid="modal-btn"
                aria-label="delete contact"
                icon={<MdEdit />}
              />
            </Flex>
          )}
        </>
      )}
    </Stack>
  );
};

export default DisplayPanel;
