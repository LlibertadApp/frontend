import { User } from 'firebase/auth';
import { ReactNode } from 'react';

/*--------- Auth Context --------*/

export type LogoutFunction = () => void;
export type CheckUserFunction = (user: User | null) => Promise<string>;

export interface AuthContextType {
  user: User | null;
  error: boolean | null;
  mesas: string[];
  setError: (error: boolean) => void
  checkUser: CheckUserFunction;
  logout: LogoutFunction;
}

export interface AuthProviderProps {
  children: ReactNode;
}

/*--------- Hamburger Context --------*/

export interface HamburgerContextType {
  menuOpen: boolean;
  setMenuOpen: (menuOpen: boolean) => void;
  closeMenu: () => void
}
export interface HamburgerProviderProps {
  children: ReactNode;
}