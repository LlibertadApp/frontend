import { Typography, TypographyOwnProps } from '@mui/material';
import { FC } from 'react';

export interface IDeskItemLabel {
  typoProps?: TypographyOwnProps;
  className?: string;
  deskValue: string | number;
  label: string;
  statusStyle?: {};
}

const DeskItemLabel: FC<IDeskItemLabel> = ({
  typoProps = {
    color: 'black',
    align: 'left',
    fontFamily: 'Poppins',
    flexDirection: 'row',
    fontSize: '14px',
  },
  className,
  deskValue,
  label,
  statusStyle,
}) => {
  return (
    <Typography {...typoProps} className={className}>
      <span className="flex flex-row py-2 text-m px-2">
        {label}:{' '}
        <span className="text-gray-400 px-2" style={statusStyle}>
          {deskValue}
        </span>
      </span>
    </Typography>
  );
};

export default DeskItemLabel;
