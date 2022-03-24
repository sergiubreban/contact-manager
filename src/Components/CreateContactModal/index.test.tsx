import { fireEvent, render, screen } from '@testing-library/react';
import CreateContactModal from '.';
import { ThemeWrapper } from '../../Utils';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

const mockedAddress = '0x0000000000000000000000000000000000000000';
describe('CreateContactModal component', () => {
  test('Should be defined', async () => {
    const component = render(
      <ThemeWrapper>
        <CreateContactModal showUseWalletSwitch={true} />
      </ThemeWrapper>
    );

    expect(component).toBeDefined();
  });

  test('Should open and show form', async () => {
    render(
      <ThemeWrapper>
        <CreateContactModal showUseWalletSwitch={true} />
      </ThemeWrapper>
    );

    expect(screen.queryByTestId('form')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('modal-btn'));

    fireEvent.change(screen.getByTestId('input__address'), { target: { value: mockedAddress } });
    expect(screen.getByTestId('form')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('submit-btn'));
  });
});
