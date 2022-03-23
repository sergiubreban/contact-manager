import { render, screen } from '@testing-library/react';
import ContactPanel from '.';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

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
const mockedShortenAddress = (str: string) => {
  return str.substring(0, 6) + '...' + str.substring(str.length - 6);
};

describe('ContactPanel component', () => {
  test('Should be defined', async () => {
    const component = render(
      <ContactPanel contact={mockedContact} />
    );

    expect(component).toBeDefined();
  });


  test('Should render contact information', async () => {
    render(
      <ContactPanel contact={mockedContact} />
    );

    expect(screen.getByText(mockedContact.name)).toBeInTheDocument();
    expect(screen.getByText(mockedShortenAddress(mockedContact.publicAddress))).toBeInTheDocument();
    expect(screen.getByText(mockedContact.lastName)).toBeInTheDocument();
    expect(screen.getByText(mockedContact.phone)).toBeInTheDocument();
    expect(screen.getByText(mockedContact.age)).toBeInTheDocument();
    expect(screen.getByText(mockedContact.website)).toBeInTheDocument();
    expect(screen.getByText(mockedContact.email)).toBeInTheDocument();
  });
  
  test('Should render N/A when contact information is missing', async () => {
    render(
      <ContactPanel contact={{}} />
    );
    
    screen.getAllByTestId('contact-data').forEach((element) => { 
      expect(element.textContent).toBe('N/A');
    });
  });
});
