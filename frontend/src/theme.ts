// theme.js

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
export const colors = {
  brand: {
    50: '#eefbf3',
    100: '#d5f6e1',
    200: '#aeecc7',
    300: '#63d69a',
    400: '#43c485',
    500: '#20a96b',
    600: '#128955',
    700: '#0f6d46',
    800: '#0e5739',
    900: '#0d4731',
    950: '#06281c',
  },
  default: {
    50: '#f6f7f6',
    100: '#e3e4e3',
    200: '#c7c8c7',
    300: '#a3a5a3',
    400: '#7c7f7c',
    500: '#656765',
    600: '#4f524f',
    700: '#424342',
    800: '#373837',
    900: '#303130',
    950: '#191a19',
  },
};

const fonts = {
  body: `'Uncut Sans', sans-serif`,
  heading: `'Bluu Next', sans-serif`,
};

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
};

// 3. extend the theme
const theme = extendTheme({ config, colors, fonts });

export default theme;
