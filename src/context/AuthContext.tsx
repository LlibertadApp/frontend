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
  const [userName, setUserName] = useState<string | null>(null);
  const [mesas, setMesas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const authToken = queryParams.get('authToken');

  const getMesasFromToken = useCallback(async (user: User) => {
    if (user) {
      const userToken = await user.getIdToken();
      const decodedToken: any = jwt_decode(userToken);
      const uid = user?.uid;

      // Seteamos en el session storage el token del usuario y su uid
      uid && sessionStorage.setItem('uid', uid);
      userToken && sessionStorage.setItem('token', userToken);
      decodedToken.fullName && sessionStorage.setItem('userName', decodedToken.fullName);

      if (decodedToken.mesas) {
        setMesas(decodedToken.mesas);
      }
    }
  }, []);

  // Chequea validez del token de usuario
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

      throw new Error('No existe usuario');
    },
    [],
  );

  const logout: LogoutFunction = useCallback(async () => {
    await signOut(firebaseAuth);
    setUser(null);
  }, []);

  const loginWithToken = async (authToken: string) => {
    try {
      await signInWithCustomToken(firebaseAuth, authToken);
      const user = firebaseAuth.currentUser;

      const uid = user?.uid;
      const userToken = await user?.getIdToken(true);

      // Seteamos en el session storage el token del usuario y su uid
      uid && sessionStorage.setItem('uid', uid);
      userToken && sessionStorage.setItem('token', userToken);
      
      setUser(user);
      return user;
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    if (authToken) {
      loginWithToken(authToken);
    }
    if (user) {
      getMesasFromToken(user);
    }
  }, [authToken, user]);

  // Escucha por cambios en la sesión de firebase
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
    <AuthContext.Provider
      value={{ user, mesas, checkUser, logout, error, setError }}
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
