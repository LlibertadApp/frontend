import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { observer } from 'mobx-react-lite';
import * as yup from 'yup';

import Button from '#/components/button';
import Input from '#/components/input';
import useAxios from '#/hooks/utils/useAxios';
import { useAuth } from '#/context/AuthContext';
import { ILoginProps } from './types';
import { paths } from '#/routes/paths';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const axios = useAxios();

  const onSubmit = async (values: ILoginProps) => {
    //TODO: Cambiar cuando la logica del LOGIN (desde el back, me devuelva el JWT y la info del Usuario)
    //TODO: Descomentar cuando este todo listo -> const { data, error, loading } = await axios.post('/auth', values);
    const { data, error, loading } = await axios.get('/user');

    if (error) return; //TODO: Snackbar de error.
    if (loading) return; //TODO: Spinner de carga.

    login(data);
    navigate(paths.home);
  };

  const validationSchema = yup.object({
    dni: yup.string().required('Campo requerido'),
    password: yup.string().required('Campo requerido'),
  });

  const { handleSubmit, handleBlur, handleChange, errors, touched } = useFormik(
    {
      initialValues: {
        dni: '',
        password: '',
      },
      onSubmit,
      validationSchema,
    },
  );

  const handleClick = async () => {
    // Maneja la lógica cuando se hace clic en el botón
    return;
  };

  function dniChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const cleanValue = value.replace(/[^\d]/g, '').slice(0, 8);
    if (!cleanValue) {
      e.target.value = cleanValue;
    } else {
      const formatted = parseInt(cleanValue).toLocaleString('es-AR');
      e.target.value = formatted;
    }
    handleChange(e);
  }

  return (
    <section className="relative flex flex-col items-center h-screen overflow-hidden bg-gray-100">
      <div className="z-10 w-5/6 p-4 md:w-1/2 shadow-3xl rounded-xl">
        <div className="container mx-auto">
          <div className="flex items-center justify-center my-10">
            <img
              src="assets/logos/fenix.png"
              alt="fenix"
              className="object-cover h-auto mr-4 rounded w-28"
            />
            <img
              src="assets/logos/lla.svg"
              alt="lla"
              className="object-cover h-auto rounded w-50"
            />
          </div>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex items-center mb-6 text-lg md:mb-8 shadow-3xl">
            <Input
              label="DNI"
              type="text"
              id="dni"
              placeholder="Ingresa tu DNI"
              onChange={dniChange}
              onBlur={handleBlur}
              error={!!errors.dni && !!touched.dni}
            />
          </div>
          <div className="flex items-center mb-6 text-lg md:mb-8 shadow-3xl">
            <Input
              label="Contraseña"
              type="password"
              id="password"
              placeholder="Ingresa tu Contraseña"
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.password && !!touched.password}
            />
          </div>
          <div className="flex flex-col items-center text-lg">
            <Button
              className="w-full p-4 text-xl font-semibold tracking-wider text-white bg-violet-brand rounded-xl"
              type="submit"
              label="Ingresar"
              onClick={handleClick}
            />

            <Link
              to={paths.totalResults}
              className="mt-8 text-lg text-center text-gray-600 underline"
            >
              Ir a resultados
            </Link>
          </div>
        </form>
      </div>

      <div
        className="absolute left-0 right-0 bottom-0 h-screen bg-violet-brand"
        style={{
          clipPath: 'polygon(0 90%, 100% 80%, 100% 100%, 0% 100%)',
        }}
      />

      {/* 
        // TODO: FIX FOOTER IMAGE DESIGN 
        // https://www.figma.com/file/iO7j93Rxbk2nIfYdqpAmv2/%F0%9F%A6%85-APP-Fiscalizaci%C3%B3n-Libertaria-%7C-%F0%9F%93%B1-FINAL?type=design&node-id=59-4193&mode=dev
        <div className='flex flex-col items-center h-screen mt-auto overflow-hidden bg-gray-100 md:hidden'> <img /
            src='assets/logos/footer.svg'
            alt='footer'
            className='w-full h-full p-0 m-0'
          /> 
        </div>
      */}
    </section>
  );
};

export const Login = observer(LoginPage);

export default Login;
