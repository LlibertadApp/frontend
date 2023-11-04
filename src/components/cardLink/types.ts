export enum colors {
  Red = 'red',
  Violet = 'violet',
}

export interface PropsCardLink {
  icon: string;
  text: string;
  link: string;
  color: colors;
  onClick?: () => void;
}

export type typeConfigColors = {
  hover: string;
  text: string;
  bg: string;
};
