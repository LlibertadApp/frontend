import {
  createContext,
  useContext,
  ReactNode,
  useState,
} from 'react';

export interface Filter {
  id: string;
  name: string;
  value: string;
}

interface FilterContextType {
  filters: Filter[];
  setFilter: (filter: Filter) => void;
  unsetFilters: () => void;
}


const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [filters, setFilters] = useState<Filter[]>([]);

  const setFilter = (filter: Filter) => {
    const filterIndex = filters.findIndex((f) => f.id === filter.id);
    if (filterIndex === -1) {
      setFilters([...filters, filter]);
    } else {
      setFilters([
        ...filters.slice(0, filterIndex),
        filter,
        ...filters.slice(filterIndex + 1),
      ]);
    }
  };

  const unsetFilters = () => {
    setFilters([]);
  }

  return (
    <FilterContext.Provider value={{ filters, setFilter, unsetFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

// Crear un hook personalizado para acceder al contexto
export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters debe ser usado dentro de un FilterProvider');
  }
  return context;
};