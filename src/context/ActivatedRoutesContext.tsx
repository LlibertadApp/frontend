import { createContext, ReactNode, useContext, useState } from 'react';

interface ActivatedRoutesContextType {
  setActiveRoute: (active: boolean) => void;
  activeRoute: boolean;
}

const ActivatedRoutesContext = createContext<
  ActivatedRoutesContextType | undefined
>(undefined);

interface ActivatedRoutesProviderProps {
  children: ReactNode;
}

export const ActivatedRoutesProvider: React.FC<
  ActivatedRoutesProviderProps
> = ({ children }) => {
  const [activeRoute, setActiveRoute] = useState(false);

  return (
    <ActivatedRoutesContext.Provider value={{ activeRoute, setActiveRoute }}>
      {children}
    </ActivatedRoutesContext.Provider>
  );
};

export const useActivatedRoutes = () => {
  const context = useContext(ActivatedRoutesContext);
  if (!context) {
    throw new Error(
      'useActivatedRoutes debe ser usado dentro de un AuthProvider',
    );
  }
  return context;
};
