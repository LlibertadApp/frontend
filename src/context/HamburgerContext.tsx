import { createContext, ReactNode, useContext, useState } from 'react';

interface HamburgerContextType {
  menuOpen: boolean;
  setMenuOpen: (menuOpen: boolean) => void;
  closeMenu: () => void
}

const HamburgerContext = createContext<HamburgerContextType | undefined>(undefined);

interface HamburgerProviderProps {
  children: ReactNode;
}

export const HamburgerProvider: React.FC<HamburgerProviderProps> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <HamburgerContext.Provider value={{ menuOpen, setMenuOpen, closeMenu }}>
      {children}
    </HamburgerContext.Provider>
  );
};

export const useHamburgerMenu = () => {
  const context = useContext(HamburgerContext);
  if (!context) {
    throw new Error('Errrr!');
  }
  return context;
};