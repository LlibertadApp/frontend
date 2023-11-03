// import React from 'react';
// import { IButtonProps } from './types';

import classNames from "classnames";
import { ButtonAppearance, IButtonProps } from "./types";
import { LoadingIndicator } from "../loadingIndicator";

// const Button: React.FC<IButtonProps> = ({
//   type,
//   className,
//   label,
//   onClick,
//   disabled = false,
// }) => (
//   <button
//     className={className}
//     type={type}
//     onClick={onClick}
//     disabled={disabled}
//   >
//     {label}
//   </button>
// );

// export default Button;

export default function Button(props: IButtonProps) {
  const appereances: Record<ButtonAppearance, string> = {
    filled: "bg-violet-brand text-white",
    outlined: "border border-violet-brand text-violet-brand",
    ghost: "text-violet-brand",
  }

  const buttonAppereance = appereances[props.appearance || "filled"];

  return (
    <button
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      className={classNames("w-full p-[18px] text-lg font-medium rounded-xl flex flex-row gap-[10px] justify-center items-center", buttonAppereance, props.className)}>
      {props.children || props.label}
    </button>
  );
}
