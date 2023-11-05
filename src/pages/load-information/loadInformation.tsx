import * as Yup from 'yup';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { TextField } from '@mui/material';
import { Formik, Form, FormikErrors } from 'formik';
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

function validateForm(values: TelegramData) {
  let { circuit, table, electors, envelopes, votes } = values;
  const errors = {} as FormikErrors<TelegramData>;

  // Verificamos que la diferencia entre electores y sobres sea menor a 5
  const validVotesDifferenceCheck =
    Math.abs((electors || 0) - (envelopes || 0)) < 5;
  if (!validVotesDifferenceCheck) {
    errors.validVotesDifference = `Hay una diferencia de ${Math.abs(
      (electors || 0) - (envelopes || 0),
    )} entre los electores y los sobres`;
  }

  // Validamos que la información de la mesa sea válida
  const validTableInformationCheck =
    circuit &&
    table &&
    Yup.number().min(0).required().isValidSync(electors) &&
    Yup.number().min(0).required().isValidSync(envelopes) &&
    validVotesDifferenceCheck;

  if (!validTableInformationCheck) {
    values.validTableInformation = false;
    errors.validTableInformation = 'Los datos de la mesa no son válidos';
  }

  values.validTableInformation = true;

  // Verificamos que la suma de los votos sea igual a la cantidad de sobres
  const totalVotes =
    votes.lla +
    votes.uxp +
    votes.blank +
    votes.null +
    votes.disputed +
    votes.identity +
    votes.command;

  const validTotalVotesCheck = totalVotes === envelopes;
  if (!validTotalVotesCheck) {
    errors.validTotalVotes = 'La suma no coincide con el total de sobres';
  }

  return errors;
}

const validationSchema = Yup.object().shape({
  circuit: Yup.string().required('Debe ingresar un circuito'),
  table: Yup.string().required('Debe ingresar una mesa'),
  electors: Yup.number()
    .integer('El número de electores debe ser un entero')
    .min(0, 'El número de electores debe ser mayor o igual a 0')
    .required('El número de electores es obligatorio'),
  envelopes: Yup.number()
    .integer('El número de sobres debe ser un entero')
    .min(0, 'El número de sobres debe ser mayor o igual a 0')
    .required('El número de sobres es obligatorio'),
  validVotesDifference: Yup.boolean(),
  validTableInformation: Yup.boolean(),
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
  validTotalVotes: Yup.boolean(),
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
    validTableInformation: false,

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

  const onSubmitForm = (values: TelegramData) => {
    console.log(values);
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
          onSubmit={onSubmitForm}
          initialValues={initialValues}
          validationSchema={validationSchema}
          validate={validateForm}
          validateOnBlur
          validateOnChange
        >
          {({
            values,
            handleSubmit,
            handleChange,
            handleBlur,
            errors,
            isValid,
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
                  type="number"
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
                    disabled={
                      !values.validTableInformation ||
                      !!errors.validTableInformation
                    }
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
                    disabled={
                      !values.validTableInformation ||
                      !!errors.validTableInformation
                    }
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
                    disabled={
                      !values.validTableInformation ||
                      !!errors.validTableInformation
                    }
                    value={values.votes.blank}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    icon={<XSquare size={40} className="p-1" color="#908DA8" />}
                    title="Votos nulos"
                  />
                  <CategoryVoteInput
                    name="votes.null"
                    disabled={
                      !values.validTableInformation ||
                      !!errors.validTableInformation
                    }
                    value={values.votes.null}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    icon={<Scales size={40} className="p-1" color="#908DA8" />}
                    title="Votos recurridos"
                  />
                  <CategoryVoteInput
                    name="votes.disputed"
                    disabled={
                      !values.validTableInformation ||
                      !!errors.validTableInformation
                    }
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
                    disabled={
                      !values.validTableInformation ||
                      !!errors.validTableInformation
                    }
                    value={values.votes.identity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    icon={<Users size={40} className="p-1" color="#908DA8" />}
                    title="Votos de comando electoral"
                  />
                  <CategoryVoteInput
                    name="votes.command"
                    disabled={
                      !values.validTableInformation ||
                      !!errors.validTableInformation
                    }
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
                  disabled={
                    !values.formAgreement ||
                    !values.validTableInformation ||
                    !!errors.validTableInformation
                  }
                  className={classNames(
                    !isValid &&
                      values.formAgreement &&
                      (values.validTableInformation ||
                        !!errors.validTableInformation) &&
                      '!bg-red',
                  )}
                  type="submit"
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
