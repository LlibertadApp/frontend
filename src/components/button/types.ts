export type ButtonAppearance =
  | 'filled'
  | 'outlined'
  | 'ghost'
  | 'unstyled'
  | 'disabled'
  | 'error'
  | 'none';

export type ButtonSize = 'sm' | 'md';

export interface IButtonProps {
  children?: React.ReactNode;
  appearance?: ButtonAppearance;
  size?: ButtonSize;

  isLoading?: boolean;

  type?: 'button' | 'submit' | 'reset';
  className?: string;
  label?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}
