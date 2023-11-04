import { FC } from 'react';

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
      className="border-2 border-violet-brand text-violet-brand bg-transparent p-3 w-full rounded-xl tracking-wider shadow-md hover:border-violet-light my-4"
    >
      <div className="flex justify-center items-center gap-2">
        <label className="cursor-pointer">Limpiar</label>{' '}
        <img src="assets/icon/trash.svg" alt="trash" />
      </div>
    </button>
  );
};
