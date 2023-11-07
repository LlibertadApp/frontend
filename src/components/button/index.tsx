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
    filled: 'bg-violet-primary text-white',
    outlined: 'border border-2 border-violet-primary text-violet-primary',
    ghost: 'text-violet-primary',
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
        'w-full p-[18px] text-[16px] tracking-normal font-medium rounded-xl flex flex-row gap-[10px] justify-center items-center leading-5',
        buttonAppereance,
        className,
      )}
    >
      {children || label}
    </button>
  );
}
