import { TypographyOwnProps } from '@mui/material';

export interface IDeskItemLabel {
  typoProps?: TypographyOwnProps;
  className?: string;
  deskValue: number;
  label: string;
  statusStyle?: {};
}

export interface IDeskNormalStatus {
  deskNormalStatus?: boolean;
}

export interface IAccordionExpanded {
  [key: string]: boolean;
}
