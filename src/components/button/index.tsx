import classNames from 'classnames';
import { ButtonAppearance, IButtonProps } from './types';

export default function Button({
  appearance = 'filled',
  type,
  onClick,
  disabled,
  label,
  children,
  className,
}: IButtonProps) {
  const appereances: Record<ButtonAppearance, string> = {
    filled: 'bg-violet-brand text-white',
    outlined: 'border border-violet-brand text-violet-brand',
    ghost: 'text-violet-brand',
    disabled: 'text-text-off bg-gray-disabled cursor-default',
    error: 'bg-red text-white',
  };

  const buttonAppereance = appereances[appearance];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        'w-full p-[18px] text-lg font-medium rounded-xl flex flex-row gap-[10px] justify-center items-center',
        buttonAppereance,
        className,
      )}
    >
      {children || label}
    </button>
  );
}
