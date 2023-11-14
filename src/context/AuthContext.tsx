import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import firebaseAuth from '#/service/firebase/firebase';
import { User, onAuthStateChanged, signInWithCustomToken } from 'firebase/auth';

import { paths } from '#/routes/paths';

type LogoutFunction = () => void;

interface AuthContextType {
  user: User | null;
  mesas: Mesa[];
  error: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  logout: LogoutFunction;
  loginWithToken: (authToken: string) => Promise<User | undefined>;
}


interface Mesa {
  mesaId: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const sessionMesas = JSON.parse(sessionStorage.getItem('mesas') || '[]');

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [mesas, setMesas] = useState(sessionMesas);
  const [error, setError] = useState<boolean>(false);

  const loginWithToken = async (authToken: string) => {
    if (!authToken) {
      throw new Error('No hay auth token');
    }

    await signInWithCustomToken(firebaseAuth, authToken);
    const user = firebaseAuth.currentUser;

    if (!user) throw new Error('Ocurrió un error al iniciar sesión');

    const uid = user.uid;
    const userToken = await user.getIdToken(true);

    // Seteamos en el session storage el token del usuario y su uid
    sessionStorage.setItem('uid', uid);
    sessionStorage.setItem('token', userToken);

    setUser(user);
    await getMesasFromToken(userToken);

    return user;
  };

  const getMesasFromToken = useCallback(async (userToken: string) => {
    if (userToken) {
      const decodedToken: any = jwt_decode(userToken);

      if (decodedToken.mesas) {
        setMesas(decodedToken.mesas);
        sessionStorage.setItem('mesas', JSON.stringify(decodedToken.mesas));
      }
    }
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
    navigate(paths.index);
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      console.log({ user })
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, mesas, error, setError, setUser, logout, loginWithToken }}
    >
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
