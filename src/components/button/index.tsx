import classNames from 'classnames';
import { ButtonAppearance, IButtonProps } from './types';

export default function Button({
  appearance = 'none',
  type,
  onClick,
  disabled,
  label,
  children,
  className,
}: IButtonProps) {
  const appereances: Record<ButtonAppearance, string> = {
    filled:
      'p-[18px] text-lg bg-violet-brand text-white disabled:bg-gray-300 disabled:text-gray-500',
    outlined: 'p-[18px] text-lg border border-violet-brand text-violet-brand',
    ghost: 'p-[18px] text-lg text-violet-brand',
    unstyled: '',
    disabled: 'text-text-off bg-gray-disabled cursor-default',
    error: 'bg-red text-white',
    none: '',
  };

  const buttonAppereance = appereances[appearance];

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
