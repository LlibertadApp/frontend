import { useNavigate, Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import * as yup from 'yup';

import Button from '#/components/button';
import useAxios from '#/hooks/utils/useAxios';
import { useAuth } from '#/context/AuthContext';
import { ILoginProps } from './types';
import { paths } from '#/routes/paths';
import { IconButton, InputAdornment, TextField } from '@mui/material';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const axios = useAxios();

  const onLogin = async (values: ILoginProps) => {
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
    email: yup.string().email('Email inválido').required('Campo requerido'),
    password: yup.string().required('Campo requerido'),
  });

  const initialValues: ILoginProps = {
    email: '',
    password: '',
    isPasswordVisible: false,
  };

  return (
    <main className='px-4 mt-[50px] mx-auto flex flex-col items-center'>
      <img
        src='assets/logos/fenix-new-bg.svg'
        alt='fenix'
        className='object-cover h-auto w-28 mb-10' />

      <h1 className='text-[32px] font-light text-center white-space: pre-line'>
        Entre todos, <br/><strong className='text-violet-brand font-semibold break-words'>evitemos el fraude.</strong>
      </h1>

      <Formik initialValues={initialValues} onSubmit={onLogin} validationSchema={validationSchema}>
        {
          ({values, handleChange, handleBlur, setFieldValue, handleSubmit, errors}) => (
            <Form className='w-full mt-16 flex flex-col gap-6' onSubmit={handleSubmit}>
              <TextField
                InputLabelProps={{ style: { fontFamily: 'Poppins' }}}
                InputProps={{ style: { borderRadius: '8px', fontFamily: 'Poppins' } }}
                sx={{ width: '100%' }}
                
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur} 
                error={Boolean(errors.email)}
                helperText={errors.email}

                label="Correo electronico"
                placeholder='myriambregman@urss-mail.ru'/>

              <TextField
                sx={{ width: '100%' }}
                
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.password)}
                helperText={errors.password}
                
                InputLabelProps={{ style: { fontFamily: 'Poppins' } }}
                InputProps={{
                  style: { borderRadius: '8px', fontFamily: 'Poppins' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={() => {
                          setFieldValue('isPasswordVisible', !values.isPasswordVisible);
                        }}
                      >
                        {
                          values.isPasswordVisible ?
                          <img src='assets/icon/eye.svg' alt='visibility' /> :
                          <img src='assets/icon/eye-off.svg' alt='visibility-off' />
                        }
                      </IconButton>
                    </InputAdornment>
                  )
                }}

                type={values.isPasswordVisible ? 'text' : 'password'}
                label="Contraseña"
                placeholder='********'/>
              
              <Button type='submit' className='mt-4' isLoading>Ingresar</Button>

              {/* TODO: Desactivar el boton hasta las 21hs del día domingo 19 GMT-3 */}
              <Link
                to={paths.totalResults}
                className="mt-4 p-[18px] w-full text-violet-brand underline rounded-xl">
                Ver Escrutinio
              </Link>
            </Form>
          )
        }
      </Formik>
    </main>
  );
};

export const Login = observer(LoginPage);

export default Login;
