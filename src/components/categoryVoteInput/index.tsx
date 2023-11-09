import { TextField } from "@mui/material";
import classNames from "classnames";

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

export default function ({disabled, icon, name, title, subtitle, titleClassName, value, onChange, onBlur}: CategoryVoteInputProps) {
  return (
    <article className={classNames("flex flex-row gap-3 items-center", disabled && 'opacity-25')}>
      { icon }
      <div className="flex flex-col flex-1">
        <h4 className={classNames("text-gray-darker text-left text-base font-semibold", titleClassName)}>{title}</h4>
        <p className="text-gray-darker text-left text-sm">{subtitle}</p>
      </div>
      <TextField
        disabled={disabled}
        name={name}
        type="number"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="000"
        inputProps={{ style: { textAlign: 'center' } }}
        InputProps={{ style: { borderRadius: '8px'} }}
        className="w-14" />
      {/* <label className="text-gray-700 text-left text-sm">{props.title}</label>
      <div className="flex flex-row gap-2 items-center">
        {props.icon}
        <TextField
          type="number"
          value={props.value}
          // onChange={props.onChange}
          onBlur={props.onBlur}
          className="w-full"
        />
      </div>
      <label className="text-gray-700 text-left text-sm">{props.subtitle}</label> */}
    </article>
  )
}