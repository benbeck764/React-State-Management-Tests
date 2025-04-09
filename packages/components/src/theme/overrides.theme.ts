import { Breakpoint } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    pageContentMargin: number;
    pageWidths: { [key in Breakpoint]: number };
    playerHeights: { [key in Breakpoint]: number };
  }

  interface ThemeOptions {
    pageContentMargin: number;
    pageWidths: { [key in Breakpoint]: number };
    playerHeights: { [key in Breakpoint]: number };
  }
}
