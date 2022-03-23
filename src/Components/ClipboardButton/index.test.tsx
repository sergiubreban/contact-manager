import { UseToastOptions } from '@chakra-ui/react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ClipboardButton from '.';


jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));


jest.mock('../../Hooks', () => {
  return {
    useAppToast: () => (options?: UseToastOptions | undefined) => ({}),
  }
});

Object.assign(navigator, {
  clipboard: {
    writeText: () => { },
  },
});

const mockedText = 'mockedText';

describe('ClipboardButton component', () => {
  test('Should be defined', async () => {
    const component = render(
      <ClipboardButton text={mockedText} aria-label={mockedText} />
    );

    expect(component).toBeDefined();
    expect(screen.getByTestId('clipboard-button')).toBeInTheDocument()
  });


  test('Should be render tooltip on hover with text passed as prop', async () => {
    render(
      <ClipboardButton text={mockedText} aria-label={mockedText} />
    );
    expect(screen.queryByTestId('tooltip')).not.toBeInTheDocument()

    fireEvent.mouseOver(screen.getByTestId('clipboard-button'));

    await waitFor(() => expect(screen.getByTestId('tooltip')).toBeInTheDocument())

    expect(screen.getByTestId('tooltip__text').textContent).toBe(mockedText)
  });


  test('Should copy to clipboard and call the toast when clicked', async () => {
    jest.spyOn(navigator.clipboard, "writeText");

    render(
      <ClipboardButton text={mockedText} aria-label={mockedText} />
    );

    fireEvent.click(screen.getByTestId('clipboard-button'));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockedText);
  });

});
