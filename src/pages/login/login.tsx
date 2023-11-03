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
import {TextField} from '@mui/material';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const axios = useAxios();

  const onSubmit = async (values: ILoginProps) => {
    //TODO: Cambiar cuando la logica del LOGIN (desde el back, me devuelva el JWT y la info del Usuario)
    const { dni, password } = values;
    const { data, error, loading } = await axios.post('/auth/sign-in', {
      dni,
      password,
    });

    if (error && error?.response && error?.response?.data) return; //TODO: Snackbar de error.
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
    const cleanValue = value.replace(/[^\d]/g, ''); // Quitar todo excepto números

    // Solo permitir hasta 8 dígitos para el DNI
    const trimmedValue = cleanValue.slice(0, 8);

    // Actualizar el valor del input con los dígitos limpios
    e.target.value = trimmedValue;

    // Llamar a handleChange con el nuevo evento
    handleChange(e);
  }

  return (
    <section className="relative flex flex-col items-center h-screen overflow-hidden bg-gray-100 pt-20">
      <div className="shadow-3xl rounded-xl">
        <div className="container">
          <div className="flex items-center justify-center my-10 w-30 ">
            <img
              src="assets/logos/fenix-login.svg"
              alt="fenix"
              className="object-cover h-auto rounded w-40"
            />
          </div>
        </div>

        <div className=' flex flex-col p-4 pt-2 pb-10 '>
          
          <span className="text-3xl">Entre todos,</span>
          <span className="text-3xl font-bold text-indigo-900">evitemos el fraude.</span>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex items-center mb-6 text-lg md:mb-8 shadow-3xl">
            <TextField
              InputLabelProps={{ style: { fontFamily: 'Poppins'  }}}
              InputProps={{ style: { borderRadius: '8px', fontFamily: 'Poppins' } }}
              sx={{ width: '100%' }}
              label="DNI"
              type="text"
              id="dni"
              placeholder="DNI"
              onChange={dniChange}
              onBlur={handleBlur}
              error={!!errors.dni && !!touched.dni}
            />
          </div>
          <div className="flex items-center mb-6 text-lg md:mb-8 shadow-3xl">
            <TextField
              InputLabelProps={{ style: { fontFamily: 'Poppins' }}}
              InputProps={{ style: { borderRadius: '8px', fontFamily: 'Poppins' } }}
              sx={{ width: '100%' }}
              label="Contraseña"
              type="password"
              id="password"
              placeholder="Contraseña"
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
              className="mt-24 text-lg text-center text-violet-light underline"
            >
              Ver escrutinios
            </Link>
          </div>
        </form>
      </div>
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
