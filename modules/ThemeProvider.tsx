import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles';
import { Averia_Serif_Libre, Noto_Serif_KR } from 'next/font/google';
import { PropsWithChildren } from 'react';

const averia = Averia_Serif_Libre({
  weight: ['300', '400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

const notoSerifKr = Noto_Serif_KR({
  weight: ['300', '400', '700'],
  style: ['normal'],
  subsets: ['latin'],
});

const theme = createTheme({
  typography: {
    fontSize: 18,
    fontFamily: [
      averia.style.fontFamily,
      notoSerifKr.style.fontFamily,
      'serif',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#000',
    },
  },
});

const ThemeProvider = ({ children }: PropsWithChildren) => {
  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
};

export default ThemeProvider;
