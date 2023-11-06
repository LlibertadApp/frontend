import { TextField } from "@mui/material";
import classNames from "classnames";

interface CategoryVoteInputProps {
  icon?: React.ReactNode;
  title?: string;
  subtitle?: string;
  titleClassName?: string;

  name?: string;
  value?: number;
  onChange?: (value: number) => void;
  onBlur?: () => void;
}

export default function ({icon, name, title, subtitle, titleClassName}: CategoryVoteInputProps) {
  return (
    <article className="flex flex-row gap-3 items-center">
      { icon }
      <div className="flex flex-col flex-1">
        <h4 className={classNames("text-gray-darker text-left text-base font-semibold", titleClassName)}>{title}</h4>
        <p className="text-gray-darker text-left text-sm">{subtitle}</p>
      </div>
      <TextField
        name={name}
        type="number"
        // value={props.value}
        // onChange={props.onChange}
        // onBlur={props.onBlur}
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