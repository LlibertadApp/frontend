import { createContext, useContext, useState } from 'react';

import { HamburgerContextType, HamburgerProviderProps } from './types';

const HamburgerContext = createContext<HamburgerContextType | undefined>(undefined);

export const HamburgerProvider: React.FC<HamburgerProviderProps> = ({ children }) => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return <HamburgerContext.Provider value={{ menuOpen, setMenuOpen, closeMenu }}>{children}</HamburgerContext.Provider>;
};

export const useHamburgerMenu = () => {
    const context = useContext(HamburgerContext);
    if (!context) {
        throw new Error('useHamburgerMenu must be used within a HamburgerProvider');
    }
    return context;
};
