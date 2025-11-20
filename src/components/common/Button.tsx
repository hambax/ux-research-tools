import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps, styled } from '@mui/material';
import { colours, typography, radii } from '../../theme/tokens';

interface ButtonBaseProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'text';
}

const BaseButton = styled(MuiButton)<ButtonBaseProps>(({ theme }) => ({
  height: '48px',
  minWidth: '120px',
  padding: '12px 24px',
  borderRadius: radii.medium,
  textTransform: 'none',
  fontFamily: typography.fontFamily,
  fontSize: '16px',
  fontWeight: typography.weights.medium,
  transition: 'all 0.2s ease-in-out',
  whiteSpace: 'nowrap',

  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
    color: colours.neutral.text.disabled,
    borderColor: colours.neutral.text.disabled,
    backgroundColor: 'transparent',
  },
}));

export const PrimaryButton = styled(BaseButton)(({ theme }) => ({
  backgroundColor: colours.primary.main,
  color: colours.primary.contrastText,
  '&:hover': {
    backgroundColor: colours.primary.dark,
  },
  '&:disabled': {
    backgroundColor: colours.neutral.text.disabled,
    color: colours.neutral.white,
    opacity: 0.4,
    border: 'none',
  }
}));

export const SecondaryButton = styled(BaseButton)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: colours.neutral.text.primary,
  border: `1px solid ${colours.neutral.text.secondary}`,
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    borderColor: colours.neutral.text.primary,
  },
}));

export const TextButton = styled(BaseButton)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: colours.neutral.text.primary,
  minWidth: 'auto',
  padding: '8px 16px',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
}));

export const IconButtonWrapper = styled('div')({
  height: '48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Button: React.FC<ButtonBaseProps> = ({ variant = 'primary', ...props }) => {
  const ButtonComponent = {
    primary: PrimaryButton,
    secondary: SecondaryButton,
    text: TextButton,
  }[variant] || PrimaryButton;

  return <ButtonComponent {...props} />;
};

export default Button;
