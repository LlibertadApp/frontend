import React from 'react';
import { IButtonProps } from './types';

const Button: React.FC<IButtonProps> = ({
  type,
  className,
  label,
  onClick,
  disabled = false,
}) => (
  <button
    className={className}
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    {label}
  </button>
);

export default Button;
