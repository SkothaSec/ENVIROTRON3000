import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00F5FF', // Bright cyan
      light: '#80F9FF',
      dark: '#00C8D4',
    },
    secondary: {
      main: '#FF00E4', // Neon pink
      light: '#FF66EE',
      dark: '#CC00B6',
    },
    background: {
      default: '#0A0E17', // Deep space black
      paper: '#141B2D',
    },
    success: {
      main: '#00FFB2', // Neon green
    },
    error: {
      main: '#FF3366', // Neon red
    },
    warning: {
      main: '#FFB800', // Neon orange
    },
    info: {
      main: '#00CCFF', // Electric blue
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#8F9BB3',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      letterSpacing: '0.02em',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      letterSpacing: '0.02em',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#8F9BB3 #0A0E17',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#8F9BB3',
            minHeight: 24,
          },
          '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
            backgroundColor: '#0A0E17',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#141B2D',
          backgroundImage: 'linear-gradient(45deg, rgba(0,245,255,0.05) 0%, rgba(0,204,255,0.05) 100%)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          fontWeight: 500,
          '&:hover': {
            boxShadow: '0 0 10px rgba(0, 245, 255, 0.3)',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #00F5FF 0%, #00CCFF 100%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #00F5FF 20%, #00CCFF 120%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(45deg, rgba(20,27,45,0.9) 0%, rgba(28,36,58,0.9) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          '&:hover': {
            boxShadow: '0 0 20px rgba(0,245,255,0.1)',
            border: '1px solid rgba(0,245,255,0.2)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
        },
        colorPrimary: {
          background: 'linear-gradient(45deg, #00F5FF 0%, #00CCFF 100%)',
        },
        colorSecondary: {
          background: 'linear-gradient(45deg, #FF00E4 0%, #FF66EE 100%)',
        },
      },
    },
  },
});