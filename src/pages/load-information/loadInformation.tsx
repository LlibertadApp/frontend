import * as Yup from 'yup';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { TextField } from '@mui/material';
import { Formik, Form, FormikErrors, FormikTouched } from 'formik';
import {
  XSquare,
  Scales,
  UserFocus,
  Users,
  NoteBlank,
} from '@phosphor-icons/react';

import Button from '#/components/button';
import Navbar from '#/components/navbar';
import ProgressIndicator from '#/components/progressIndicator';
import { ProgressStepStatus } from '#/components/progressIndicator/types';

import Alert from '#/components/alert';
import Checkbox from '#/components/checkbox/checkbox';
import CategoryVoteInput from '#/components/categoryVoteInput';
import { TelegramData } from './types';

const validationSchema = Yup.object().shape({
  circuit: Yup.string().required('Debe ingresar un circuito'),
  table: Yup.string().required('Debe ingresar una mesa'),
  electors: Yup.number()
    .integer('El número de electores debe ser un entero')
    .positive('El número de electores debe ser mayor a 0')
    .required('El número de electores es obligatorio'),
  envelopes: Yup.number()
    .integer('El número de sobres debe ser un entero')
    .positive('El número de sobres debe ser mayor a 0')
    .required('El número de sobres es obligatorio')
    .test(
      'is-within-range',
      'El número de sobres debe tener una diferencia de más o menos 5 con respecto a los electores',
      function(value) {
        const { electors } = this.parent; // Obtiene el valor de "electores" del mismo contexto
        return Math.abs((electors || 0) - (value || 0)) < 5 || this.createError({ path: 'validVotesDifference', message: 'Alto kuka sos que me estas queriendo hacer fraude' });
      }
    ),

  votes: Yup.object().shape({
    lla: Yup.number()
      .integer('El número de votos debe ser un entero')
      .min(0, 'El número de votos debe ser mayor o igual a 0')
      .required('El número de votos es obligatorio'),
    uxp: Yup.number()
      .integer('El número de votos debe ser un entero')
      .min(0, 'El número de votos debe ser mayor o igual a 0')
      .required('El número de votos es obligatorio'),
    blank: Yup.number()
      .integer('El número de votos debe ser un entero')
      .min(0, 'El número de votos debe ser mayor o igual a 0')
      .required('El número de votos es obligatorio'),
    null: Yup.number()
      .integer('El número de votos debe ser un entero')
      .min(0, 'El número de votos debe ser mayor o igual a 0')
      .required('El número de votos es obligatorio'),
    disputed: Yup.number()
      .integer('El número de votos debe ser un entero')
      .min(0, 'El número de votos debe ser mayor o igual a 0')
      .required('El número de votos es obligatorio'),
    identity: Yup.number()
      .integer('El número de votos debe ser un entero')
      .min(0, 'El número de votos debe ser mayor o igual a 0')
      .required('El número de votos es obligatorio'),
    command: Yup.number()
      .integer('El número de votos debe ser un entero')
      .min(0, 'El número de votos debe ser mayor o igual a 0')
      .required('El número de votos es obligatorio'),
  }),
  validTotalVotes: Yup.boolean().test(
    'is-within-range',
    'La suma no coincide con el total de sobres de majul',
    function() {
      const { envelopes, votes } = this.parent;
      const totalVotes =
        votes.lla +
        votes.uxp +
        votes.blank +
        votes.null +
        votes.disputed +
        votes.identity +
        votes.command;

      return totalVotes === envelopes || this.createError({ path: 'validTotalVotes', message: 'La suma no coincide con el total de sobres de majul' });
    },
  ),

  formAgreement: Yup.boolean().oneOf(
    [true],
    'Debe aceptar el acuerdo de la mesa',
  ),
});

function LoadInformationPage() {
  const initialValues: TelegramData = {
    circuit: 'Circuito 1',
    table: '0012',
    electors: undefined,
    envelopes: undefined,
    validVotesDifference: false,

    votes: {
      lla: 0,
      uxp: 0,
      blank: 0,
      null: 0,
      disputed: 0,
      identity: 0,
      command: 0,
    },
    validTotalVotes: false,

    formAgreement: false,
  };

  const isTableDataValid = (touched: FormikTouched<TelegramData>, errors: FormikErrors<TelegramData>) => {
    return (
      (touched.table && touched.electors && touched.envelopes) &&
      (!errors.circuit && !errors.table && !errors.electors && !errors.envelopes && !errors.validVotesDifference)
    );
  }

  const onSubmitForm = (values: TelegramData, errors: FormikErrors<TelegramData>) => {
    if (Object.keys(errors).length > 0) console.log('DENUCIAR!!!!!')
    else console.log('ENVIAR DATOS', values);
  };

  return (
    <>
      <Navbar routerLink="/verify-certificate" />
      <main className="container mx-auto p-4 flex flex-col gap-[30px]">
        <ProgressIndicator
          steps={[
            ProgressStepStatus.Successful,
            ProgressStepStatus.Successful,
            ProgressStepStatus.Active,
          ]}
        />
        <h1 className="py-8 text-neutral-700 text-xl font-semibold">
          Completá los datos del certificado
        </h1>
        <Formik
          onSubmit={() => {}}
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnBlur
          validateOnChange
        >
          {({
            values,
            touched,
            handleSubmit,
            handleChange,
            handleBlur,
            errors,
            isValid,
            setErrors
          }) => (
            <Form className="flex flex-col gap-8">
              <section className="grid grid-cols-2 gap-6">
                <TextField
                  disabled
                  label="Circuito"
                  name="circuit"
                  variant="outlined"
                  value={values.circuit}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  InputProps={{ style: { borderRadius: '8px' } }}
                  error={!!errors.circuit}
                />
                <TextField
                  label="Mesa"
                  name="table"
                  variant="outlined"
                  placeholder="00000/0"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputProps={{ style: { borderRadius: '8px' } }}
                  error={!!errors.table}
                />

                <TextField
                  label="Nro de electores"
                  name="electors"
                  variant="outlined"
                  placeholder="0"
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputProps={{ style: { borderRadius: '8px' } }}
                  error={!!errors.electors || !!errors.validVotesDifference}
                  helperText={errors.electors}
                />
                <TextField
                  label="Sobres"
                  name="envelopes"
                  variant="outlined"
                  placeholder="0"
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputProps={{ style: { borderRadius: '8px' } }}
                  error={!!errors.envelopes || !!errors.validVotesDifference}
                  helperText={errors.envelopes}
                />
              </section>
              <hr className="w-full border-x border-gray-300/50" />
              <section className="flex flex-col gap-1">
                <h2 className="text-sm text-left text-gray-darker">
                  Diferencia
                </h2>
                <Alert
                  error={!!errors.validVotesDifference}
                  message={errors.validVotesDifference || 'Sin diferencia'}
                />
              </section>
              <hr className="w-full border-x border-gray-300/50" />
              <section className="flex flex-col gap-[30px]">
                <section className="flex flex-col gap-4">
                  <CategoryVoteInput
                    name="votes.lla"
                    disabled={!isTableDataValid(touched, errors)}
                    value={values.votes.lla}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    icon={
                      <div className="w-10 h-10 flex justify-center items-center text-sm font-semibold bg-party-lla text-white rounded-full">
                        LLA
                      </div>
                    }
                    title="La Libertad Avanza"
                    titleClassName="text-party-lla"
                    subtitle="Javier Milei - Victoria Villaruel"
                  />

                  <CategoryVoteInput
                    name="votes.uxp"
                    disabled={!isTableDataValid(touched, errors)}
                    value={values.votes.uxp}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    icon={
                      <div className="w-10 h-10 flex justify-center items-center text-sm font-semibold bg-party-uxp text-white rounded-full">
                        UXP
                      </div>
                    }
                    title="Unión por la Patria"
                    titleClassName="text-party-uxp"
                    subtitle="Sergio Massa - Agustín Rossi"
                  />
                  <CategoryVoteInput
                    name="votes.blank"
                    disabled={!isTableDataValid(touched, errors)}
                    value={values.votes.blank}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    icon={<XSquare size={40} className="p-1" color="#908DA8" />}
                    title="Votos nulos"
                  />
                  <CategoryVoteInput
                    name="votes.null"
                    disabled={!isTableDataValid(touched, errors)}
                    value={values.votes.null}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    icon={<Scales size={40} className="p-1" color="#908DA8" />}
                    title="Votos recurridos"
                  />
                  <CategoryVoteInput
                    name="votes.disputed"
                    disabled={!isTableDataValid(touched, errors)}
                    value={values.votes.disputed}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    icon={
                      <UserFocus size={40} className="p-1" color="#908DA8" />
                    }
                    title="Votos identidad impugnada"
                  />
                  <CategoryVoteInput
                    name="votes.identity"
                    disabled={!isTableDataValid(touched, errors)}
                    value={values.votes.identity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    icon={<Users size={40} className="p-1" color="#908DA8" />}
                    title="Votos de comando electoral"
                  />
                  <CategoryVoteInput
                    name="votes.command"
                    disabled={!isTableDataValid(touched, errors)}
                    value={values.votes.command}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    icon={
                      <NoteBlank size={40} className="p-1" color="#908DA8" />
                    }
                    title="Votos en blanco"
                  />
                </section>
                <Alert
                  error={!!errors.validTotalVotes}
                  message={
                    errors.validTotalVotes ||
                    'La suma coincide con el total de sobres'
                  }
                />
                <Checkbox
                  name="formAgreement"
                  label="Verifico que controlé y que todos los datos son correctos."
                  checked={values.formAgreement}
                  onChange={handleChange}
                />
                <Button
                  type='button'
                  onClick={() => onSubmitForm(values, errors)}
                  disabled={ !isTableDataValid(touched, errors) || !values.formAgreement }
                  className={classNames(
                    (!isTableDataValid(touched, errors) || !values.formAgreement) ||
                    ( !errors.validTotalVotes ) ||
                    '!bg-red',
                  )}
                >
                  Enviar datos
                </Button>
              </section>
            </Form>
          )}
        </Formik>
      </main>
    </>
  );
}

export const LoadInformation = observer(LoadInformationPage);

export default LoadInformation;
