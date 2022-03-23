import { Accordion } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import ContactListItem from '.';

const mockedContact = {
  id: '1 name',
  name: 'test publicAddress',
  publicAddress: '0xC22C55F952e123E453FdCa0ASD4GFWEAaA2AA7b',
  lastName: 'test last name',
  phone: 'test phone',
  age: 1,
  website: 'website.test',
  email: 'test@email.com',
}

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));


describe('ContactListItem component', () => {
  test('Should be defined', async () => {
    const component = render(
      <Accordion>
        <ContactListItem contact={mockedContact} />
      </Accordion>
    );

    expect(component).toBeDefined();
  });


  test('Should render contact information headings', async () => {
    render(
      <Accordion>
        <ContactListItem contact={mockedContact} />
      </Accordion>
    );

    expect(screen.getByTestId('contact-heading__name').textContent).toBe(mockedContact.name);
    expect(screen.getByTestId('contact-heading__last-name').textContent).toBe(mockedContact.lastName);
  });


  test('Should render contact action buttons', async () => {
    render(
      <Accordion>
        <ContactListItem contact={mockedContact} />
      </Accordion>
    );

    expect(screen.getByTestId('action-button__email')).toBeInTheDocument();
    expect(screen.getByTestId('action-button__phone')).toBeInTheDocument();
    expect(screen.getByTestId('action-button__wallet-address')).toBeInTheDocument();
  });

});
