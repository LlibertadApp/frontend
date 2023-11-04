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
  setFilters: (filters: Filter[]) => void;
  clearFilters: () => void;
}


const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [filters, setFilters] = useState<Filter[]>([]);

  const clearFilters = () => {
    setFilters([]);
  }

  return (
    <FilterContext.Provider value={{ filters, setFilters, clearFilters }}>
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