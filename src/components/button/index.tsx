import classNames from 'classnames';
import { ButtonAppearance, ButtonSize, IButtonProps } from './types';

export default function Button({
  appearance = 'filled',
  size = 'md',
  type,
  onClick,
  disabled,
  label,
  children,
  className,
}: IButtonProps) {
  const appereances: Record<ButtonAppearance, string> = {
    filled:
      'bg-violet-brand text-white disabled:bg-gray-300 disabled:text-gray-500',
    outlined: 'border border-violet-brand text-violet-brand',
    ghost: 'text-violet-brand focus:ring-2 focus:ring-violet-brand',
    unstyled: '',
    disabled: 'text-text-off bg-gray-disabled cursor-default',
    error: 'bg-red text-white',
    none: '',
  };

  const sizes: Record<ButtonSize, string> = {
    sm: 'p-[10px] text-sm',
    md: 'p-[18px] text-lg',
  };

  const buttonAppereance = classNames(appereances[appearance], sizes[size]);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        'w-full font-medium rounded-xl flex flex-row gap-[10px] justify-center items-center',
        buttonAppereance,
        className,
      )}
    >
      {children || label}
    </button>
  );
}
