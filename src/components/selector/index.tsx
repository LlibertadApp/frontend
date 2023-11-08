import { FormControl, TextField, Autocomplete } from '@mui/material';

interface ISelectorProps {
  onChange: (value: string) => void;
  label: string;
  options: { key: string; label: string }[];
  value: string;
}

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
      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.label}
        value={options.find((option) => option.key === value) || null}
        onChange={(key, newValue) => {
          if (newValue) {
            onChange(newValue.key);
          }
        }}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </FormControl>
  );
}
