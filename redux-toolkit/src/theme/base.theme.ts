import {
  Breakpoint,
  BreakpointsOptions,
  PaletteOptions,
  ThemeOptions,
  TypographyVariants,
} from "@mui/material/styles";

const breakpointValues: { [key in Breakpoint]: number } = {
  xs: 0,
  sm: 330,
  md: 414,
  lg: 768,
  xl: 1200,
};

const breakPointsOptions: BreakpointsOptions = { values: breakpointValues };

export const lineHeights: { [key in keyof TypographyVariants]: number } = {
  h1: 36,
  h2: 30,
  h3: 26,
  h4: 22,
  h5: 18,
  h6: 16,
  paragraph: 18,
  paragraphBold: 18,
  paragraphLink: 18,
  paragraphLarge: 18,
  paragraphSmall: 16,
  paragraphSmallBold: 14,
  paragraphExtraSmall: 14,
  paragraphExtraSmallBold: 16,

  button: 18,

  iconSmall: 18,
  iconMedium: 20,
  iconLarge: 29,

  // undefined:
  caption: -1,
  overline: -1,
  fontFamily: -1,
  fontSize: -1,
  fontWeightLight: -1,
  fontWeightRegular: -1,
  fontWeightMedium: -1,
  fontWeightBold: -1,
  htmlFontSize: -1,
  pxToRem: -1,
  body1: -1,
  body2: -1,
  subtitle1: -1,
  subtitle2: -1,
};

const paragraph = {
  fontSize: 14,
  fontWeight: 400,
  lineHeight: lineHeights.paragraph + "px",
  letterSpacing: 0,
};

const paragraphBold = {
  fontSize: 14,
  fontWeight: 700,
  lineHeight: lineHeights.paragraphBold + "px",
  letterSpacing: 0,
};

const paragraphLink = {
  fontSize: 14,
  fontWeight: 700,
  lineHeight: lineHeights.paragraphLink + "px",
  letterSpacing: 0,
};

const paragraphSmall = {
  fontSize: 12,
  fontWeight: 400,
  lineHeight: lineHeights.paragraphSmall + "px",
  letterSpacing: 0,
};

const paragraphLarge = {
  fontSize: 16,
  fontWeight: 700,
  lineHeight: lineHeights.paragraphLarge + "px",
  letterSpacing: 0,
};

const paragraphSmallBold = {
  fontSize: 11,
  fontWeight: 700,
  lineHeight: lineHeights.paragraphSmallBold + "px",
  letterSpacing: 0,
};

const paragraphExtraSmall = {
  fontSize: 12,
  fontWeight: 400,
  lineHeight: lineHeights.paragraphExtraSmall + "px",
  letterSpacing: 0,
};

const paragraphExtraSmallBold = {
  fontSize: 11,
  fontWeight: 700,
  lineHeight: lineHeights.paragraphExtraSmallBold + "px",
  letterSpacing: 0,
};

const spacing = 8;
const pageContentMargin = spacing * 4;

const headerHeights = {
  xs: 48,
  sm: 48,
  md: 48,
  lg: 48,
  xl: 48,
};

const playerHeights = {
  xs: 87.5,
  sm: 87.5,
  md: 87.5,
  lg: 87.5,
  xl: 87.5,
};

const pageWidths: { [key in Breakpoint]: number } = {
  xs: 375,
  sm: 414,
  md: 429,
  lg: 792,
  xl: 1280,
};

const contentWidths: { [key in Breakpoint]: number } = {
  xs: pageWidths["xs"] - 48,
  sm: pageWidths["sm"] - 48,
  md: pageWidths["md"] - 48,
  lg: pageWidths["lg"] - 48,
  xl: pageWidths["xl"] - 48,
};

export function getThemeBase(palette: PaletteOptions): ThemeOptions {
  return {
    headerHeights: {
      ...headerHeights,
    },
    playerHeights: {
      ...playerHeights,
    },
    pageContentMargin: pageContentMargin,
    pageWidths: pageWidths,
    contentWidths: contentWidths,
    spacing,
    palette: palette,
    typography: {
      fontFamily: "sans-serif",
      fontWeightLight: 400,
      fontSize: 14,
      h1: {
        fontSize: "clamp(46px, 8vw, 72px)",
        fontWeight: 600,
        lineHeight: 1.1,
        letterSpacing: -0.5,
        wordSpacing: "-0.025em",
      },
      h2: {
        fontSize: "clamp(30px, 7vw, 56px)",
        fontWeight: 600,
        lineHeight: 1.1,
        letterSpacing: -0.5,
        wordSpacing: "-0.025em",
      },
      h3: {
        fontSize: "clamp(24px, 7vw, 36px)",
        fontWeight: 700,
        lineHeight: 1.1,
        letterSpacing: -0.5,
      },
      h4: {
        fontSize: 22,
        fontWeight: 700,
        lineHeight: lineHeights.h4 + "px",
        letterSpacing: 0,
      },
      h5: {
        fontSize: 20,
        fontWeight: 700,
        lineHeight: lineHeights.h5 + "px",
        letterSpacing: 0.5,
      },
      h6: {
        fontSize: 18,
        fontWeight: 600,
        lineHeight: lineHeights.h6 + "px",
        letterSpacing: 0,
      },
      paragraph: {
        ...paragraph,
      },
      paragraphBold: {
        ...paragraphBold,
      },
      paragraphLink: {
        ...paragraphLink,
      },
      paragraphLarge: {
        ...paragraphLarge,
      },
      paragraphSmall: {
        ...paragraphSmall,
      },
      paragraphSmallBold: {
        ...paragraphSmallBold,
      },
      paragraphExtraSmall: {
        ...paragraphExtraSmall,
      },
      paragraphExtraSmallBold: {
        ...paragraphExtraSmallBold,
      },
      iconSmall: {
        fontSize: 14,
        lineHeight: lineHeights.iconSmall + "px",
      },
      iconMedium: {
        fontSize: 20,
        lineHeight: lineHeights.iconMedium + "px",
      },
      iconLarge: {
        fontSize: 26,
        lineHeight: lineHeights.iconLarge + "px",
      },
      button: {
        ...paragraphBold,
        textTransform: "none",
      },
    },
    shape: {
      borderRadius: 8,
    },
    breakpoints: breakPointsOptions,
  };
}
