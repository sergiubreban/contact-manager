import { fireEvent, render, screen } from '@testing-library/react';
import DeleteContactModal from '.';
import { ThemeWrapper } from '../../Utils';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('../../Hooks', () => {
  return {
    useContactDocRef: jest.fn(),
    useAppToast: () => ({}),
  };
});

describe('DeleteContactModal component', () => {
  test('Should be defined', async () => {
    const component = render(
      <ThemeWrapper>
        <DeleteContactModal docId="test" />
      </ThemeWrapper>
    );

    expect(component).toBeDefined();
  });

  test('Should open and show form', async () => {
    render(
      <ThemeWrapper>
        <DeleteContactModal docId="test" />
      </ThemeWrapper>
    );

    expect(screen.queryByTestId('confirm-btn')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('modal-btn'));

    expect(screen.getByTestId('confirm-btn')).toBeInTheDocument();
  });
});
