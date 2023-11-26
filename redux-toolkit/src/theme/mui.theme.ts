import { Theme, ThemeOptions } from "@mui/material/styles";

export const getMUITheme = (themeBaseOptions: ThemeOptions): ThemeOptions => {
  const themeBase = themeBaseOptions as Theme;

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
      MuiButton: {
        styleOverrides: {
          text: {
            "&.MuiButton-text": {
              "&:focus": {
                color: themeBase.palette?.text.primary,
              },
              "&:hover": {
                color: themeBase.palette?.text.primary,
              },
            },
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
            "&.MuiInput-root": {
              border: "none !important",
              borderRadius: `500px !important`,
              backgroundColor: `${themeBase.palette.grey[800]} !important`,
              height: "40px !important",
            },
            "&:hover": {
              border: `1px solid ${themeBase.palette.grey[600]} !important`,
            },
            "&.Mui-focused": {
              border: `2px solid ${themeBase.palette.common.white} !important`,
            },
            "&.Mui-disabled": {
              backgroundColor: themeBase.palette.coolGrey[100],
              color: themeBase.palette.coolGrey[500],
            },
          },
          input: {
            ...themeBase.typography.paragraphLarge,

            "&::placeholder": {
              color: themeBase.palette.grey[600],
              opacity: 0.7,
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
