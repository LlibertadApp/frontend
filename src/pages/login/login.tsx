import { observer } from 'mobx-react-lite';
import { useAuth } from '#/context/AuthContext';

const LoginPage: React.FC = () => {
  const { user } = useAuth();

  return user ? (
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
  ) : (
    <>
      <div className="lg:absolute lg:inset-0 lg:bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-white to-red-error lg:z-0"></div>
      <main className="px-4 mx-auto flex flex-col items-center rounded-3xl max-w-md gap-8 mt-20 lg:max-w-[624px] lg:px-[108px] lg:py-[50px] lg:relative lg:bg-white lg:mt-52">
        <h1 className="text-3xl text-text-off lg:text-[38px] font-light text-center lg:leading-10">
          La sesión
          <br />
          <strong className="text-red font-semibold">
            no es válida o está vencida.
          </strong>
        </h1>
        <img
          src="assets/logos/fenix-new-bg-red.svg"
          alt="fenix"
          className="object-cover h-auto w-28 lg:w-40 mb-10 shadow-rose-600 shadow-md rounded-full bg-red-error"
        />
      </main>
    </>
  );
};

export const Login = observer(LoginPage);

export default Login;
