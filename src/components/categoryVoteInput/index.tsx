import { TextField } from '@mui/material';
import classNames from 'classnames';
import { useState } from 'react';
import React from 'react';
interface CategoryVoteInputProps {
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

export default function ({
  disabled,
  icon,
  name,
  title,
  subtitle,
  titleClassName,
  value,
  onChange,
  onBlur,
}: CategoryVoteInputProps) {
  const [localValue, setLocalValue] = useState<number | string>(value || '');

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    let newValue = e.target.value;
    const isValidNumber = /^[0-9]*$/.test(newValue);

    const clampedValue = isValidNumber
      ? Math.min(600, Math.max(0, Number(newValue)))
      : 0;
    setLocalValue(clampedValue);
    onChange &&
      ((e.target.value = isValidNumber ? clampedValue.toString() : '0'),
      onChange(e));
  };

  return (
    <article
      className={classNames(
        'flex flex-row gap-3 items-center',
        disabled && 'opacity-25',
      )}
    >
      {icon}
      <div className="flex flex-col flex-1">
        <h4
          className={classNames(
            'text-gray-darker text-left text-base font-semibold',
            titleClassName,
          )}
        >
          {title}
        </h4>
        <p className="text-gray-darker text-left text-sm">{subtitle}</p>
      </div>
      <TextField
        disabled={disabled}
        name={name}
        type="number"
        value={localValue}
        onChange={handleInputChange}
        onBlur={onBlur}
        placeholder=""
        inputProps={{ style: { textAlign: 'center' }, maxLength: 3 }}
        InputProps={{ style: { borderRadius: '8px' } }}
        className="w-14"
      />
    </article>
  );
}
