export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'dark'
      ? {
          primary: {
            main: '#4FC3F7',
            light: '#81D4FA',
            dark: '#0288D1',
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#BA68C8',
            light: '#CE93D8',
            dark: '#8E24AA',
            contrastText: '#ffffff',
          },
          background: {
            default: '#090B10',
            paper: 'rgba(18, 23, 32, 0.85)',
          },
          text: {
            primary: '#E8EEF6',
            secondary: '#A9B4C5',
          },
          divider: 'rgba(255,255,255,0.1)',
        }
      : {
          primary: {
            main: '#0288D1',
            light: '#4FC3F7',
            dark: '#01579B',
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#8E24AA',
            light: '#BA68C8',
            dark: '#4A148C',
            contrastText: '#ffffff',
          },
          background: {
            default: '#F0F4FA',
            paper: 'rgba(255, 255, 255, 0.85)',
          },
          text: {
            primary: '#1A2027',
            secondary: '#4A5568',
          },
          divider: 'rgba(0,0,0,0.08)',
        }),
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 800, letterSpacing: '-0.01em' },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.02em' },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          backgroundColor: mode === 'dark' ? '#090B10' : '#F0F4FA',
          color: mode === 'dark' ? '#E8EEF6' : '#1A2027',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          boxShadow: 'none',
          fontWeight: 600,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': { 
            transform: 'translateY(-2px)',
            boxShadow: mode === 'dark' ? '0 8px 24px rgba(79, 195, 247, 0.25)' : '0 8px 24px rgba(2, 136, 209, 0.2)' 
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          border: mode === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.05)',
          background: mode === 'dark' ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.4) 100%)' : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.6) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: mode === 'dark' ? '0 24px 48px rgba(0,0,0,0.4)' : '0 24px 48px rgba(0,0,0,0.05)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          border: mode === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.05)',
          background: mode === 'dark' ? 'rgba(18, 23, 32, 0.65)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(16px)',
          boxShadow: mode === 'dark' ? '0 12px 32px rgba(0,0,0,0.3)' : '0 12px 32px rgba(0,0,0,0.04)',
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined', size: 'medium' },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
            },
            '&.Mui-focused': {
              backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'transparent',
              boxShadow: mode === 'dark' ? '0 0 0 4px rgba(79, 195, 247, 0.15)' : '0 0 0 4px rgba(2, 136, 209, 0.1)',
            }
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: mode === 'dark' ? 'rgba(16, 20, 29, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderLeft: mode === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.05)',
        },
      },
    },
  },
});
