import { extendTheme } from '@chakra-ui/react';
import { ThemeProvider } from '@emotion/react';

export const shortenAddress = (str: string) => {
  return str.substring(0, 6) + '...' + str.substring(str.length - 6);
};

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

export const appTheme = extendTheme({ config });

/**
 *
 * @param param0 children components
 * @returns Chakra ui TheProvider, which is helpful for testing
 */
export const ThemeWrapper = ({ children }: any) => <ThemeProvider theme={appTheme}>{children}</ThemeProvider>;
