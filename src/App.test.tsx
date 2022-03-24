import { render } from './test-utils';
import { App } from './App';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

Object.assign(window, {
  ethereum: {
    on: jest.fn(),
    request: jest.fn(),
  },
});

test('renders learn react link', () => {
  const component = render(<App />);

  expect(component).toBeDefined();
});
