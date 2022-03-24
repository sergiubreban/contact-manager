import { fireEvent, render, screen } from '@testing-library/react';
import CreateContactModal from '.';
import { ThemeWrapper } from '../../Utils';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe('CreateContactModal component', () => {
  test('Should be defined', async () => {
    const component = render(
      <ThemeWrapper>
        <CreateContactModal distinctTags={[]} verifyWallet={true} />
      </ThemeWrapper>
    );

    expect(component).toBeDefined();
  });

  test('Should open and show form', async () => {
    render(
      <ThemeWrapper>
        <CreateContactModal distinctTags={[]} verifyWallet={true} />
      </ThemeWrapper>
    );

    expect(screen.queryByTestId('form')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('modal-btn'));

    expect(screen.getByTestId('form')).toBeInTheDocument();
  });
});
