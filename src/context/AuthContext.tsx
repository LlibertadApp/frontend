import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import { User, onAuthStateChanged } from 'firebase/auth';
import firebaseAuth from '#/service/firebase/firebase';

import { paths } from '#/routes/paths';

type LogoutFunction = () => void;

interface AuthContextType {
  user: User | null;
  mesas: Mesa[];
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: LogoutFunction;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface Mesa {
  mesaId: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [mesas, setMesas] = useState([]);

  const getMesasFromToken = async (user: User) => {
    const idToken = await user.getIdToken();

    if (idToken) {
      const decodedToken: any = jwt_decode(idToken);

      if (decodedToken.mesas) {
        setMesas(decodedToken.mesas);
      }
    }
  };

  const logout = () => {
    setUser(null);
    navigate(paths.index);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      getMesasFromToken(user);
    }
  }, [user]);

  useEffect(() => {
    console.log(mesas);
  }, [mesas]);

  return (
    <AuthContext.Provider value={{ user, mesas, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
