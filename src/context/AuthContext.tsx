import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import jwt_decode from 'jwt-decode';

import {
  AuthContextType,
  AuthProviderProps,
  CheckUserFunction,
  LogoutFunction,
} from './types';

import {
  User,
  onAuthStateChanged,
  signInWithCustomToken,
  signOut,
} from 'firebase/auth';
import firebaseAuth from '#/service/firebase/firebase';

import { LoadingPage } from '#/pages/loading-page';
import { paths } from '#/routes/paths';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [mesas, setMesas] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const authToken = queryParams.get('authToken');

  const getMesasFromToken = useCallback(async (user: User) => {
    if (user) {
      const userToken = await user.getIdToken(true);
      const decodedToken: any = jwt_decode(userToken);

      if (decodedToken.mesas) {
        setMesas(decodedToken.mesas);
      }
    }
  }, []);

  // Check user validity
  const checkUser: CheckUserFunction = useCallback(
    async (user: User | null) => {
      if (user) {
        try {
          const userToken = await user.getIdToken();
          const decodedToken: any = jwt_decode(userToken);
          if (decodedToken.exp * 1000 < Date.now()) {
            throw new Error('Token expirado');
          }
          return userToken as string;
        } catch (error) {
          throw new Error('Token inválido');
        }
      }

      throw new Error('User is null');
    },
    [],
  );

  useEffect(() => {
    if (user) {
      getMesasFromToken(user);
    }
  }, [user]);

  useEffect(() => {
    let isMounted = true;
    if (authToken) {
      const loginWithToken = async (authToken: string) => {
        if (!authToken) {
          throw new Error('No hay auth token');
        }

        await signInWithCustomToken(firebaseAuth, authToken);
        const user = firebaseAuth.currentUser;

        if (!user) throw new Error('Ocurrió un error al iniciar sesión');
        setUser(user);

        return user;
      };
      if (authToken) {
        loginWithToken(authToken);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [authToken]);

  const logout: LogoutFunction = useCallback(async () => {
    await signOut(firebaseAuth);
    setUser(null);
  }, []);

  // listen for auth status changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        navigate(paths.index);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <AuthContext.Provider value={{ user, mesas, checkUser, logout }}>
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
