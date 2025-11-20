import { createTheme } from '@mui/material/styles';
import { colours, typography, spacing, radii } from './tokens';

const theme = createTheme({
  palette: {
    primary: {
      main: colours.primary.main,
      light: colours.primary.light,
      dark: colours.primary.dark,
      contrastText: colours.primary.contrastText,
    },
    secondary: {
      main: colours.secondary.main,
      light: colours.secondary.light,
      dark: colours.secondary.dark,
      contrastText: colours.secondary.contrastText,
    },
    background: {
      default: colours.neutral.background,
      paper: colours.neutral.paper,
    },
    text: {
      primary: colours.neutral.text.primary,
      secondary: colours.neutral.text.secondary,
      disabled: colours.neutral.text.disabled,
    },
    divider: colours.neutral.divider,
    success: { main: colours.semantic.success },
    error: { main: colours.semantic.error },
    warning: { main: colours.semantic.warning },
    info: { main: colours.semantic.info },
  },
  typography: {
    fontFamily: typography.fontFamily,
    h1: {
      fontSize: typography.sizes.h1,
      fontWeight: typography.weights.semibold,
    },
    h2: {
      fontSize: typography.sizes.h2,
      fontWeight: typography.weights.semibold,
    },
    h3: {
      fontSize: typography.sizes.h3,
      fontWeight: typography.weights.semibold,
    },
    h4: {
      fontSize: typography.sizes.h4,
      fontWeight: typography.weights.semibold,
    },
    h5: {
      fontSize: typography.sizes.h5,
      fontWeight: typography.weights.semibold,
    },
    h6: {
      fontSize: typography.sizes.h6,
      fontWeight: typography.weights.semibold,
    },
    body1: {
      fontSize: typography.sizes.body1,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: typography.sizes.body2,
      lineHeight: 1.5,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: radii.medium,
          padding: '12px 24px',
          fontSize: typography.sizes.body1,
          fontWeight: typography.weights.medium,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: radii.large,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: radii.large,
          padding: '20px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: radii.medium,
            height: '48px', // Match button height
          },
          '& .MuiInputLabel-root': {
            transform: 'translate(14px, 12px) scale(1)', // Center label when not shrunk
            '&.Mui-focused, &.MuiFormLabel-filled': {
              transform: 'translate(14px, -9px) scale(0.75)', // Move label up when focused/filled
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: '12px 14px', // Adjust padding to vertically center text within 48px
          height: 'auto',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          height: '48px',
          borderRadius: radii.medium,
        }
      }
    }
  },
  spacing: spacing.unit,
});

export default theme;
