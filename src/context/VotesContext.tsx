import { createContext, useContext, ReactNode, useState } from 'react';

interface VotesContextType {
  votesData: { [key: string]: any };
  updateVotesData: (field: string, value: any) => void;
}

const VotesContext = createContext<VotesContextType | undefined>(undefined);

interface VotesProviderProps {
  children: ReactNode;
}

// Proveedor del contexto
export const VotesProvider: React.FC<VotesProviderProps> = ({ children }) => {
  const [votesData, setVotesData] = useState<{ [key: string]: any }>({});

  // Con esto actualizamos el contexto
  const updateVotesData = (field: string, value: any) => {
    setVotesData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <VotesContext.Provider value={{ votesData, updateVotesData }}>
      {children}
    </VotesContext.Provider>
  );
};

// Con esto consumimos el contexto en los componentes
export const useVotesContext = () => {
  const context = useContext(VotesContext);
  if (!context) {
    throw new Error('useVotesContext debe ser usado dentro de un VotesProvider');
  }
  return context;
};
