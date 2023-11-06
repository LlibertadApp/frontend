import { FC } from 'react';
import { Trash } from '@phosphor-icons/react';

export interface ButtonClearFilterProps {
  amountOfFilters: number;
  clearFilters: () => void;
}

export const ButtonClearFilter: FC<ButtonClearFilterProps> = ({
  clearFilters,
  amountOfFilters,
}) => {
  return (
    <button
      type="button"
      onClick={() => clearFilters()}
      className="border-2 border-violet-primary text-violet-primary bg-transparent p-3 w-full rounded-xl tracking-wider shadow-md hover:border-violet-light my-4"
    >
      <div className="flex justify-center items-center gap-2">
        <label className="cursor-pointer">Limpiar</label>{' '}
        <Trash size={24}/>
      </div>
    </button>
  );
};
