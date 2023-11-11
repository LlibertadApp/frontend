import { Link } from 'react-router-dom';
import { ButtonFilterProps } from './types';
import { FC } from 'react';
import { paths } from '#/routes/paths';
import { Faders } from '@phosphor-icons/react';

export const ButtonFilter: FC<ButtonFilterProps> = ({ amount = 5 }) => {
  return (
    <Link
      to={''}
      className="flex flex-row justify-center gap-[10px] bg-violet-brand text-white px-4 py-4 w-full rounded-xl tracking-wider hover:border-violet-light hover:bg-violet-dark my-4"
    >
      Filtros{' '}
      <Faders
        size={24}
        weight="bold"
        alt="sliders icon"
        className="-rotate-90"
      />
    </Link>
  );
};
