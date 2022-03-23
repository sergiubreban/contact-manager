import { fireEvent, render, screen } from '@testing-library/react';
import CreateContactModal from '.';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe('CreateContactModal component', () => {
  test('Should be defined', async () => {
    const component = render(
      <CreateContactModal />
    );

    expect(component).toBeDefined();
  });

  test('Should open and show form', async () => {
    render(
      <CreateContactModal />
    );
    
    expect(screen.queryByTestId('form')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('modal-btn'))

    expect(screen.getByTestId('form')).toBeInTheDocument();
  });
});
