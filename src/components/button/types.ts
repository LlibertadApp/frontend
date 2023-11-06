export type ButtonAppearance =
  | 'filled'
  | 'outlined'
  | 'ghost'
  | 'disabled'
  | 'error'
  | 'none';

export interface IButtonProps {
  children?: React.ReactNode;
  appearance?: ButtonAppearance;
  isLoading?: boolean;

  type?: 'button' | 'submit' | 'reset';
  className?: string;
  label?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}
