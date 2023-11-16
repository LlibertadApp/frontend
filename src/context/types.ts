import { User } from 'firebase/auth';
import { ReactNode } from 'react';

export type LogoutFunction = () => void;
export type CheckUserFunction = (user: User | null) => Promise<string>;

export interface AuthContextType {
  user: User | null;
  mesas: { mesaId: string }[];
  loginWithToken: (authToken: string) => Promise<User | undefined>;
  checkUser: CheckUserFunction;
  logout: LogoutFunction;
}

export interface AuthProviderProps {
  children: ReactNode;
}
