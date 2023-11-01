export interface IButtonProps {
  type: 'button' | 'submit' | 'reset';
  className: string;
  label: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}
