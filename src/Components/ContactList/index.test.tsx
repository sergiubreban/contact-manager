import { render, screen } from '@testing-library/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import ContactList from '.';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('react-firebase-hooks/firestore', () => {
  return { useCollection: jest.fn() };
});

jest.mock('firebase/firestore', () => {
  return { collection: jest.fn() };
});

jest.mock('../../Hooks', () => {
  return {
    useFirestore: jest.fn(),
    useStorage: jest.fn(),
    useContactRef: jest.fn(),
    useAppToast: () => ({}),
    useMetamask: () => 'fake address',
  };
});

const randomContact = () => {
  const uniqueId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  return {
    id: `${uniqueId}`,
    name: `name ${uniqueId}`,
    publicAddress: `publicAddress ${uniqueId}`,
    lastName: `lastName ${uniqueId}`,
    phone: `phone ${uniqueId}`,
    age: `age ${uniqueId}`,
    website: `website ${uniqueId}`,
    email: `email ${uniqueId}`,
  };
};
const mockedFireDocs = {
  docs: [
    {
      id: 1,
      data: randomContact,
    },
    {
      id: 2,
      data: randomContact,
    },
  ],
};

describe('ContactList component', () => {
  test('Should be defined', async () => {
    (useCollection as jest.Mock).mockImplementation(() => []);

    const component = render(<ContactList />);

    expect(component).toBeDefined();
  });

  test('Should render loading state', async () => {
    (useCollection as jest.Mock).mockImplementation(() => [, true]);

    render(<ContactList />);

    expect(screen.queryByTestId('contacts--loading')).toBeInTheDocument();
    expect(screen.queryByTestId('contacts--error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('contacts--fetched')).not.toBeInTheDocument();
  });

  test('Should render fetched state', async () => {
    (useCollection as jest.Mock).mockImplementation(() => [mockedFireDocs, false]);

    render(<ContactList />);

    expect(screen.queryByTestId('contacts--loading')).not.toBeInTheDocument();
    expect(screen.queryByTestId('contacts--error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('contacts--fetched')).toBeInTheDocument();
  });

  test('Should render error state', async () => {
    (useCollection as jest.Mock).mockImplementation(() => [, false, { error: true }]);

    render(<ContactList />);

    expect(screen.queryByTestId('contacts--loading')).not.toBeInTheDocument();
    expect(screen.queryByTestId('contacts--error')).toBeInTheDocument();
    expect(screen.queryByTestId('contacts--fetched')).not.toBeInTheDocument();
  });
});
