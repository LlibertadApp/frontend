import { FormControl, TextField, Autocomplete } from '@mui/material';

interface ISelectorProps {
  onChange: (value: string) => void;
  label: string;
  options: { key: string; label: string }[];
  value: string;
}

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
