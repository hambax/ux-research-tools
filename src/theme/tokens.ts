export const colours = {
  primary: {
    main: '#1976D2', // Darkened from #2196F3 for AA contrast with white
    light: '#42a5f5', // Adjusted light
    dark: '#1565C0', // Darkened
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#C2185B', // Darkened from #FF4081 for AA contrast with white
    light: '#E91E63', // Adjusted light
    dark: '#880E4F', // Darkened
    contrastText: '#FFFFFF',
  },
  neutral: {
    white: '#FFFFFF',
    background: '#F4F6F8',
    paper: '#FFFFFF',
    text: {
      primary: '#1A2027',
      secondary: '#3E5060',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
  },
  semantic: {
    success: '#2e7d32',
    error: '#d32f2f',
    warning: '#ed6c02',
    info: '#0288d1',
  }
};

export const typography = {
  fontFamily: "'Inter', sans-serif",
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  sizes: {
    h1: '2.5rem',
    h2: '2rem',
    h3: '1.75rem',
    h4: '1.5rem',
    h5: '1.25rem',
    h6: '1rem',
    body1: '1rem',
    body2: '0.875rem',
    caption: '0.75rem',
  }
};

export const spacing = {
  unit: 8,
  px: (multiplier: number) => `${multiplier * 8}px`,
};

export const radii = {
  small: '4px',
  medium: '8px',
  large: '12px',
  circle: '50%',
};
