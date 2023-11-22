import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import './styles.css';
import { ISelectorProps } from './types';

const ArrowIcon = ({ className }: { className: string }) => {
  return (
    <div className="mr-4 w-10 h-10 relative">
      <div className={className}>
        <img src="/assets/icon/arrow-continue.svg" className="rotate-90" />
      </div>
    </div>
  );
};

export function Selector({ onChange, label, options, value }: ISelectorProps) {
  return (
    <FormControl fullWidth className="select">
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        className="w-full text-black text-left"
        IconComponent={ArrowIcon}
        value={value}
        onChange={onChange}
        MenuProps={{
          slotProps: {
            paper: {
              className: 'select-menu',
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.key} value={option.key}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
