import { useNavigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { paths } from '#/routes/paths';

import firebaseAuth from '#/service/firebase/firebase';

import { signInWithCustomToken } from 'firebase/auth';
import { useEffect } from 'react';

import { useAuth } from '#/context/AuthContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const authToken = queryParams.get('authToken');

  useEffect(() => {
    let isComponentMounted = true;

    const loginWithToken = async () => {
      try {
        if (authToken) {
          await signInWithCustomToken(firebaseAuth, authToken);
          const user = firebaseAuth.currentUser;

          if (isComponentMounted) {
            if (user) {
              user
                .getIdToken(true)
                .then(() => {
                  navigate(paths.home);
                })
                .catch((error) => {
                  console.log('error', error);
                });
            }
          }
        }
      } catch (error) {
        if (isComponentMounted) {
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

  return user ? (
    <>
      <div className="lg:absolute lg:inset-0 lg:bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-white to-violet-primary lg:z-0"></div>
      <main className="px-4 mt-52 mx-auto flex flex-col items-center max-w-md lg:max-w-[624px] lg:px-[108px] lg:py-[50px] rounded-3xl lg:relative lg:bg-white">
        <img
          src="assets/logos/fenix-new-bg.svg"
          alt="fenix"
          className="object-cover h-auto w-28 lg:w-40 mb-10"
        />

        <h1 className="text-[32px] lg:text-[38px] font-light text-center white-space: pre-line">
          Entre todos, <br />
          <strong className="text-violet-brand font-semibold break-words">
            evitemos el fraude.
          </strong>
        </h1>
        <h1 className="py-8 text-lg lg:text-2xl font-light text-center white-space: pre-line">
          Validando{' '}
          <strong className="text-violet-brand font-semibold break-words">
            token...
          </strong>
        </h1>
      </main>
    </>
  ) : (
    <>
      <div className="lg:absolute lg:inset-0 lg:bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-white to-red-error lg:z-0"></div>
      <main className="px-4 mx-auto flex flex-col items-center rounded-3xl max-w-md gap-8 mt-20 lg:max-w-[624px] lg:px-[108px] lg:py-[50px] lg:relative lg:bg-white lg:mt-52">
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
  );
};

export const Login = observer(LoginPage);

export default Login;
