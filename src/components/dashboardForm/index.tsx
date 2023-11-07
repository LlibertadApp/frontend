import React from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import * as Yup from 'yup';
import { FormValues, FormField } from './types';

// Valores iniciales tipados
const initialValues: FormValues = {
  name: '',
  province: '',
  locality: '',
  school: '',
  email: '',
  phone: '',
  dni: '',
};

// Esquema de validación tipado
const validationSchema = Yup.object({
  name: Yup.string()
    .required('El nombre y apellido son obligatorios')
    .min(2, 'El nombre es demasiado corto'),
  province: Yup.string().required('La provincia es obligatoria'),
  locality: Yup.string().required('La localidad es obligatoria'),
  school: Yup.string().required('El nombre de la escuela es obligatorio'),
  email: Yup.string()
    .email('El email no es válido')
    .required('El email es obligatorio'),
  phone: Yup.string()
    .required('El teléfono es obligatorio')
    .matches(/^[0-9]+$/, 'El teléfono solo debe contener números')
    .min(8, 'El teléfono debe tener al menos 8 dígitos'),
  dni: Yup.string()
    .required('El DNI es obligatorio')
    .matches(/^[0-9]+$/, 'El DNI solo debe contener números')
    .length(8, 'El DNI debe tener 8 dígitos'),
});

const formFields: FormField[] = [
  { name: 'name', label: 'Nombre y Apellido', type: 'text' },
  { name: 'province', label: 'Provincia', type: 'text' },
  { name: 'locality', label: 'Localidad', type: 'text' },
  { name: 'school', label: 'Escuela', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone', label: 'Telefono', type: 'number' },
  { name: 'dni', label: 'DNI', type: 'number' },
];

const DashboardForm: React.FC = () => {
  return (
    <div className="mb-16">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(
          values: FormValues,
          { setSubmitting }: FormikHelpers<FormValues>,
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {(formikProps) => (
          <Form>
            <Stack spacing={2} padding={2}>
              {formFields.map((field) => (
                <Field
                  key={field.name}
                  as={TextField}
                  type={field.type}
                  name={field.name}
                  label={field.label}
                  value={formikProps.values[field.name]}
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                  error={
                    formikProps.touched[field.name] &&
                    Boolean(formikProps.errors[field.name])
                  }
                  helperText={
                    formikProps.touched[field.name] &&
                    formikProps.errors[field.name]
                  }
                  InputProps={{
                    style: { borderRadius: '12px' },
                  }}
                />
              ))}
            </Stack>
            <div
              style={{
                position: 'fixed',
                bottom: 16,
                left: 0,
                right: 0,
                paddingLeft: '5%',
                paddingRight: '5%',
              }}
            >
              <Button
                type="submit"
                variant="contained"
                size="large"
                style={{ width: '100%' }}
                disabled={formikProps.isSubmitting}
                sx={{ textTransform: 'capitalize' }}
              >
                Enviar
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DashboardForm;
