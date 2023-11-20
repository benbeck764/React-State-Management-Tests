import { Theme, ThemeOptions, TypographyVariants } from "@mui/material/styles";
import { lineHeights } from "./base.theme";

export const getMUITheme = (themeBaseOptions: ThemeOptions): ThemeOptions => {
  const themeBase = themeBaseOptions as Theme;
  const spacing = themeBaseOptions.spacing as number;

  function generateInputRules(options: {
    typographyVariant: keyof TypographyVariants;
    paddingX: number;
    paddingY: number;
    borderWidthNormal: number;
    borderWidthFocus: number;
  }) {
    const lineHeight = lineHeights[options.typographyVariant];
    return {
      backgroundColor: themeBase.palette.common.white,
      borderRadius: themeBase.shape.borderRadius,
      height: lineHeight + options.paddingY * 2,
      input: {
        height: lineHeight,
      },
      "&:not(.MuiInputBase-formControl)": {
        input: {
          ...(themeBase.typography[
            options.typographyVariant
          ] as React.CSSProperties),
          paddingTop: options.paddingY - options.borderWidthNormal,
          paddingBottom: options.paddingY - options.borderWidthNormal,
          paddingLeft: options.paddingX - options.borderWidthNormal,
          paddingRight: options.paddingX - options.borderWidthNormal,

          borderWidth: options.borderWidthNormal,
          borderStyle: "solid",
          borderColor: themeBase.palette.coolGrey[300],
          borderRadius: themeBase.shape.borderRadius,

          "&:focus": {
            borderColor: themeBase.palette.primary.main,
            borderWidth: options.borderWidthFocus,

            paddingTop: options.paddingY - options.borderWidthFocus,
            paddingBottom: options.paddingY - options.borderWidthFocus,
            paddingLeft: options.paddingX - options.borderWidthFocus,
            paddingRight: options.paddingX - options.borderWidthFocus,
          },
          "&:disabled": {
            borderColor: themeBase.palette.coolGrey[300],
          },
        },
      },
    };
  }

  return {
    ...themeBaseOptions,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            "*::-webkit-scrollbar": {
              width: "14px",
            },
            "*::-webkit-scrollbar-thumb": {
              backgroundColor: themeBase.palette.coolGrey[500],
            },
            "*::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },
          },
          body: {
            overflowY: "scroll", // Scrollbar always exists to avoid flickering
          },
        },
      },
      MuiCard: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            backgroundColor: themeBase.palette.coolGrey[900],
          },
        },
      },
      MuiInput: {
        defaultProps: {
          disableUnderline: true,
        },
        styleOverrides: {
          root: {
            "&.MuiInputBase-sizeExtraSmall": {
              ...generateInputRules({
                typographyVariant: "paragraphSmall",
                paddingX: spacing,
                paddingY: spacing * 0.5,
                borderWidthNormal: 1.5,
                borderWidthFocus: 2,
              }),
            },
            "&.MuiInputBase-sizeSmall": {
              ...generateInputRules({
                typographyVariant: "paragraph",
                paddingX: spacing,
                paddingY: spacing * 0.5,
                borderWidthNormal: 1.5,
                borderWidthFocus: 2,
              }),
            },
            "&.MuiInputBase-sizeMedium": {
              ...generateInputRules({
                typographyVariant: "paragraph",
                paddingX: spacing * 2,
                paddingY: spacing,
                borderWidthNormal: 1.5,
                borderWidthFocus: 2,
              }),
            },
            "&.MuiInputBase-sizeLarge": {
              ...generateInputRules({
                typographyVariant: "paragraph",
                paddingX: spacing * 1.5,
                paddingY: spacing * 1.25,
                borderWidthNormal: 1.5,
                borderWidthFocus: 2,
              }),
            },
            "&.Mui-disabled": {
              backgroundColor: themeBase.palette.coolGrey[100],
              color: themeBase.palette.coolGrey[500],
            },
          },
          input: {
            "&::placeholder": {
              color: themeBase.palette.coolGrey[700],
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "&.MuiInputBase-root": {
              height: "24px",
            },
            "&.MuiInputBase-root.MuiInput-sizeExtraSmall": {
              ...themeBase.typography.paragraphSmall,
              height: "24px",
            },
            "&.MuiInputBase-root.MuiInputBase-sizeSmall": {
              ...themeBase.typography.paragraph,
              height: "32px",
            },
            "&.MuiInputBase-root.MuiInputBase-sizeMedium": {
              ...themeBase.typography.paragraph,
              height: "40px",
            },
            "&.MuiInputBase-root.MuiInputBase-sizeLarge": {
              fontSize: "16px",
              lineHeight: "20px",
              height: "40px",
            },
          },
          input: {
            "&::placeholder": {
              color: themeBase.palette.coolGrey[700],
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            "&.MuiInputBase-root": {
              height: "36px",
            },
            "&.MuiInputBase-root.MuiInputBase-sizeSmall": {
              height: "27px",
            },
          },
          input: {
            "&::placeholder": {
              color: themeBase.palette.coolGrey[700],
            },
          },
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            backgroundColor: themeBase.palette.coolGrey[900],
          },
        },
      },
      MuiTooltip: {
        defaultProps: {
          arrow: true,
        },
        styleOverrides: {
          arrow: {
            "&.MuiTooltip-arrow": {
              color: themeBase.palette.grey[800],
            },
          },
          tooltip: {
            "&.MuiTooltip-tooltip": {
              ...themeBase.typography.paragraphSmall,
              background: themeBase.palette.grey[800],
              borderRadius: `${themeBase.shape.borderRadius}px`,
              paddingLeft: 8,
              paddingRight: 8,
              paddingTop: 8,
              paddingBottom: 8,
              maxWidth: "600px",
              margin: "6px !important",
            },
          },
        },
      },
    },
  };
};
