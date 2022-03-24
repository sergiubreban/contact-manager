import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import ContactForm from '.';
import { Contact } from '../../Types';
import { ThemeWrapper } from '../../Utils';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));
const mockedAddress = '0x0000000000000000000000000000000000000000';

const mockedClipboardText = '0x0000000000000000000000000000000000000001';
Object.assign(navigator, {
  clipboard: {
    readText: async () => mockedClipboardText,
  },
});

describe('ContactForm component', () => {
  test('Should be defined', async () => {
    let submitedData = null;

    const component = render(
      <ThemeWrapper>
        <ContactForm actionText="Add" onSubmit={(data) => (submitedData = data)} />
      </ThemeWrapper>
    );

    expect(component).toBeDefined();
    expect(screen.getByTestId('input__name')).toBeInTheDocument();
    expect(screen.getByTestId('input__lastName')).toBeInTheDocument();
    expect(screen.getByTestId('input__phone')).toBeInTheDocument();
    expect(screen.getByTestId('input__age')).toBeInTheDocument();
    expect(screen.getByTestId('input__website')).toBeInTheDocument();
    expect(screen.getByTestId('input__email')).toBeInTheDocument();
    expect(screen.getByTestId('input__profilePic')).toBeInTheDocument();
  });

  test('Should submit form on submit event', async () => {
    let submitedData: Contact = {};

    render(
      <ThemeWrapper>
        <ContactForm actionText="Add" onSubmit={(data) => (submitedData = data)} askAddress={true} />
      </ThemeWrapper>
    );

    fireEvent.change(screen.getByTestId('input__address'), { target: { value: mockedAddress } });
    fireEvent.change(screen.getByTestId('input__name'), { target: { value: 'input__name' } });
    fireEvent.change(screen.getByTestId('input__lastName'), { target: { value: 'input__lastName' } });
    fireEvent.change(screen.getByTestId('input__phone'), { target: { value: 'input__phone' } });
    fireEvent.change(screen.getByTestId('input__age'), { target: { value: 0 } });
    fireEvent.change(screen.getByTestId('input__website'), { target: { value: 'input__website' } });
    fireEvent.change(screen.getByTestId('input__email'), { target: { value: 'input__email' } });

    fireEvent.submit(screen.getByTestId('form'));

    expect(submitedData?.publicAddress).toEqual(mockedAddress);
    expect(submitedData?.name).toEqual('input__name');
    expect(submitedData?.lastName).toEqual('input__lastName');
    expect(submitedData?.phone).toEqual('input__phone');
    expect(submitedData?.age).toEqual(0);
    expect(submitedData?.website).toEqual('input__website');
    expect(submitedData?.email).toEqual('input__email');
  });

  test('Should submit form on submit button clicked', async () => {
    let submitedData: Contact = {};

    render(
      <ThemeWrapper>
        <ContactForm actionText="Add" onSubmit={(data) => (submitedData = data)} askAddress={true} />
      </ThemeWrapper>
    );

    fireEvent.change(screen.getByTestId('input__address'), { target: { value: mockedAddress } });
    fireEvent.change(screen.getByTestId('input__name'), { target: { value: 'input__name' } });
    fireEvent.change(screen.getByTestId('input__lastName'), { target: { value: 'input__lastName' } });
    fireEvent.change(screen.getByTestId('input__phone'), { target: { value: 'input__phone' } });
    fireEvent.change(screen.getByTestId('input__age'), { target: { value: 0 } });
    fireEvent.change(screen.getByTestId('input__website'), { target: { value: 'input__website' } });
    fireEvent.change(screen.getByTestId('input__email'), { target: { value: 'input__email' } });

    fireEvent.click(screen.getByTestId('submit-btn'));

    expect(submitedData?.publicAddress).toEqual(mockedAddress);
    expect(submitedData?.name).toEqual('input__name');
    expect(submitedData?.lastName).toEqual('input__lastName');
    expect(submitedData?.phone).toEqual('input__phone');
    expect(submitedData?.age).toEqual(0);
    expect(submitedData?.website).toEqual('input__website');
    expect(submitedData?.email).toEqual('input__email');
  });

  test('Should submit form on submit with askAddress false', async () => {
    let submitedData: Contact = {};

    render(
      <ThemeWrapper>
        <ContactForm
          actionText="Add"
          distinctTags={['test']}
          publicAddress={mockedAddress}
          onSubmit={(data) => (submitedData = data)}
          askAddress={false}
        />
      </ThemeWrapper>
    );

    fireEvent.change(screen.getByTestId('input__name'), { target: { value: 'input__name' } });
    fireEvent.change(screen.getByTestId('input__lastName'), { target: { value: 'input__lastName' } });
    fireEvent.change(screen.getByTestId('input__phone'), { target: { value: 'input__phone' } });
    fireEvent.change(screen.getByTestId('input__age'), { target: { value: '1' } });
    fireEvent.change(screen.getByTestId('input__website'), { target: { value: 'input__website' } });
    fireEvent.change(screen.getByTestId('input__email'), { target: { value: 'input__email' } });

    fireEvent.click(screen.getByTestId('submit-btn'));

    expect(submitedData?.publicAddress).toEqual(mockedAddress);
    expect(submitedData?.name).toEqual('input__name');
    expect(submitedData?.lastName).toEqual('input__lastName');
    expect(submitedData?.phone).toEqual('input__phone');
    expect(submitedData?.age).toEqual(1);
    expect(submitedData?.website).toEqual('input__website');
    expect(submitedData?.email).toEqual('input__email');
    expect(submitedData?.verified).toEqual(false);
  });

  test('Should paste address from clipboard', async () => {
    let submitedData: Contact = {};
    jest.spyOn(navigator.clipboard, 'readText');

    render(
      <ThemeWrapper>
        <ContactForm
          actionText="Add"
          distinctTags={['test']}
          onSubmit={(data) => (submitedData = data)}
          askAddress={true}
        />
      </ThemeWrapper>
    );

    await act(async () => {
      await fireEvent.click(screen.getByTestId('button__paste-address'));
    });

    expect(navigator.clipboard.readText).toHaveBeenCalled();
  });
});
