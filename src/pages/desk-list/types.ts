import { TypographyOwnProps } from '@mui/material';

export interface IDeskItemLabel {
  typoProps?: TypographyOwnProps;
  className?: string;
  deskValue: string;
  label: string;
  statusStyle?: {};
}
