export interface CategoryVoteInputProps {
  icon?: React.ReactNode;
  title?: string;
  subtitle?: string;
  titleClassName?: string;

  disabled?: boolean;
  name?: string;
  value?: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}
