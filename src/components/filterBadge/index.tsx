import { FC } from 'react';
import { IFilterBadgesProps } from './types';

export const FilterBadge: FC<IFilterBadgesProps> = ({ text }) => {
  return (
    <label className="border-2 py-2 px-2 border-x-violet-brand-light rounded-full text-sm font-normal">
      {' '}
      {text}{' '}
    </label>
  );
};
