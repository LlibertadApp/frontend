import { useNavigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { paths } from '#/routes/paths';

import firebaseAuth from '#/service/firebase/firebase';

import { signInWithCustomToken } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { useAuth } from '#/context/AuthContext';
import { LoadingIndicator } from '#/components/loadingIndicator';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const authToken = queryParams.get('authToken');
  const [error, setError] = useState<boolean>(!authToken);

  useEffect(() => {
    let isComponentMounted = true;

    const loginWithToken = async () => {
      try {
        if (authToken) {
          await signInWithCustomToken(firebaseAuth, authToken);
          const user = firebaseAuth.currentUser;

          const uid = user?.uid;
          const userToken = await user?.getIdToken(true);

          // Si no hay uid o token, no se puede continuar
          if (!uid || !userToken) {
            setError(true);
            return; // TODO: Ver si hay que hacer algo más
          }

          // Seteamos en el session storage el token del usuario y su uid
          sessionStorage.setItem('uid', uid);
          sessionStorage.setItem('token', userToken);

          if (isComponentMounted) {
            if (user) {
              user
                .getIdToken(true)
                .then(() => {
                  navigate(paths.home);
                })
                .catch((error) => {
                  setError(true);
                  console.log('error', error);
                });
            }
          }
        }
      } catch (error) {
        if (isComponentMounted) {
          setError(true);
          console.error(error);
        }
      }
    };

    if (authToken) {
      loginWithToken();
    }

    return () => {
      isComponentMounted = false;
    };
  }, [authToken]);

  return error ? (
    <>
      <div className="lg:fixed lg:inset-0 lg:bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-white to-violet-primary lg:z-0" />
      <main className="px-4 mt-[50px] mx-auto flex flex-col items-center max-w-md lg:max-w-[624px] lg:px-[108px] lg:py-[50px] rounded-3xl lg:relative lg:bg-white">
        <h1 className="text-3xl lg:text-[38px] font-light text-center white-space: pre-line">
          El token de autenticación <br />
          <strong className="text-red font-semibold break-words">
            no es válido o está vencido.
          </strong>
        </h1>
        <img
          src="assets/logos/fenix-new-bg.svg"
          alt="fenix"
          className="object-cover h-auto w-28 lg:w-40 mb-10"
        />
      </main>
    </>
  ) : (
    <>
      <div className="lg:absolute lg:inset-0 lg:bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-white to-violet-primary lg:z-0"></div>
      <main className="px-4 mt-52 mx-auto flex flex-col items-center max-w-md lg:max-w-[624px] lg:px-[108px] lg:py-[50px] rounded-3xl lg:relative lg:bg-white">
        <span className="relative flex items-center justify-center w-28 lg:w-40">
          <span className="animate-[ping_2s_infinite] absolute inline-flex h-3/4 w-3/4 rounded-full bg-violet-700 opacity-75"></span>
          <img
            src="assets/logos/fenix-new-bg.svg"
            alt="fenix"
            className="object-cover h-auto w-28 lg:w-40"
          />
        </span>
        <h1 className="text-[32px] lg:text-[38px] font-light text-center white-space: pre-line mt-10">
          Entre todos, <br />
          <strong className="text-violet-brand font-semibold break-words">
            evitemos el fraude.
          </strong>
        </h1>
        <h1 className="py-8 text-lg lg:text-2xl font-light text-center white-space: pre-line">
          Validando{' '}
          <strong className="text-violet-brand font-semibold break-words animate-[pulse_2s_infinite]">
            identidad...
          </strong>
        </h1>
      </main>
    </>
  );
};

export const Login = observer(LoginPage);

export default Login;
