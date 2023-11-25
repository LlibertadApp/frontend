import React from 'react';

export enum colors {
  Red = 'red',
  Violet = 'violet',
  Green = 'green',
}

export interface PropsCardLink {
  icon: React.ReactNode;
  text: string;
  link?: string;
  color: colors;
  onClick?: () => void;
}

export type typeConfigColors = {
  hover: string;
  text: string;
  bg: string;
};
