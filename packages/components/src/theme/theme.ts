import { createTheme, Theme } from '@mui/material/styles';
import { getThemeBase } from './base.theme';
import { getMUITheme } from './mui.theme';

const getTheme = (): Theme => {
  return createTheme(getMUITheme(getThemeBase()));
};

export default getTheme;
