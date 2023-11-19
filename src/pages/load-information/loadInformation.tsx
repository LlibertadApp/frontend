import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import { TextField, MenuItem } from '@mui/material';
import { Dialog } from '@headlessui/react';
import { Formik, Form, FormikErrors, FormikTouched } from 'formik';
import {
  XSquare,
  Scales,
  UserFocus,
  Users,
  NoteBlank,
} from '@phosphor-icons/react';

import { validationProps } from '#/utils/validationProps';
import forcedWarn from '/assets/icon/warn-icon.svg';

import { paths } from '#/routes/paths';
import { useCertificate } from '#/context/CertificationContext';
import Alert from '#/components/alert';
import Button from '#/components/button';
import Navbar from '#/components/navbar';
import Checkbox from '#/components/checkbox/checkbox';
import CategoryVoteInput from '#/components/categoryVoteInput';
import ProgressIndicator from '#/components/progressIndicator';
import { ProgressStepStatus } from '#/components/progressIndicator/types';
import { useAuth } from '#/context/AuthContext';
import { useActas } from '#/hooks/utils/useActas';
import { TelegramData } from './types';

const validationSchema = Yup.object().shape({
  circuit: Yup.string().required('Debe ingresar un circuito'),
  table: Yup.string().required('Debe ingresar una mesa'),
  electors: Yup.number()
    .integer('El número de electores debe ser un entero')
    .positive('El número de electores debe ser mayor a 0')
    .max(600, 'El número de votos no puede ser mayor que 600')
    .required('El número de electores es obligatorio'),
  envelopes: Yup.number()
    .integer('El número de sobres debe ser un entero')
    .positive('El número de sobres debe ser mayor a 0')
    .max(600, 'El número de votos no puede ser mayor que 600')
    .required('El número de sobres es obligatorio')
    .test('is-within-range', function (value) {
      const { electors } = this.parent; // Obtiene el valor de "electores" del mismo contexto
      const difference = Math.abs((electors || 0) - (value || 0));

      // El mensaje debe ser prural o singular dependiendo de la diferencia
      // Mensaje de ejemplo: Hay una diferencia de 5 sobres con respecto a los electores
      const message = `Hay una diferencia de ${difference} ${
        difference > 1 ? 'sobres' : 'sobre'
      } con respecto a los electores`;

      return (
        difference <= 5 ||
        this.createError({ path: 'validVotesDifference', message })
      );
    }),

  votes: Yup.object().shape({
    lla: Yup.number()
      .integer('El número de votos debe ser un entero')
      .min(0, 'El número de votos debe ser mayor o igual a 0')
      .max(600, 'El número de votos no puede ser mayor que 600')
      .required('El número de votos es obligatorio'),
    uxp: Yup.number()
      .integer('El número de votos debe ser un entero')
      .min(0, 'El número de votos debe ser mayor o igual a 0')
      .max(600, 'El número de votos no puede ser mayor que 600')
      .required('El número de votos es obligatorio'),
    blank: Yup.number()
      .integer('El número de votos debe ser un entero')
      .min(0, 'El número de votos debe ser mayor o igual a 0')
      .max(600, 'El número de votos no puede ser mayor que 600')
      .required('El número de votos es obligatorio'),
    null: Yup.number()
      .integer('El número de votos debe ser un entero')
      .min(0, 'El número de votos debe ser mayor o igual a 0')
      .max(600, 'El número de votos no puede ser mayor que 600')
      .required('El número de votos es obligatorio'),
    disputed: Yup.number()
      .integer('El número de votos debe ser un entero')
      .min(0, 'El número de votos debe ser mayor o igual a 0')
      .max(600, 'El número de votos no puede ser mayor que 600')
      .required('El número de votos es obligatorio'),
    identity: Yup.number()
      .integer('El número de votos debe ser un entero')
      .min(0, 'El número de votos debe ser mayor o igual a 0')
      .max(600, 'El número de votos no puede ser mayor que 600')
      .required('El número de votos es obligatorio'),
    command: Yup.number()
      .integer('El número de votos debe ser un entero')
      .min(0, 'El número de votos debe ser mayor o igual a 0')
      .max(600, 'El número de votos no puede ser mayor que 600')
      .required('El número de votos es obligatorio'),
  }),
  validTotalVotes: Yup.boolean().test('is-within-range', function () {
    const { envelopes, votes } = this.parent;
    const totalVotes =
      votes.lla +
      votes.uxp +
      votes.blank +
      votes.null +
      votes.disputed +
      votes.identity +
      votes.command;

    if (totalVotes > 600) {
      return this.createError({
        path: 'validTotalVotes',
        message: 'El total de votos es mayor que 600',
      });
    } else if (!(totalVotes === envelopes)) {
      return this.createError({
        path: 'validTotalVotes',
        message: 'La suma no coincide con el total de votos',
      });
    }

    return true;
  }),

  formAgreement: Yup.boolean().oneOf(
    [true],
    'Debe aceptar el acuerdo de la mesa',
  ),
});

function LoadInformationPage() {
  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { file, completedForm, setCompletedForm } = useCertificate();
  const { mesas } = useAuth();
  const [mesa, setMesa] = useState<string | undefined>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { saveActas } = useActas(); // Usa el Hook creado

  useEffect(() => {
    if (completedForm) {
      navigate(paths.uploadActa);
    }
  }, []);

  const initialValues: TelegramData = {
    circuit: mesas[0].split('-')[3],
    table: '0',
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

  const isTableDataValid = (
    touched: FormikTouched<TelegramData>,
    errors: FormikErrors<TelegramData>,
  ) => {
    return (
      touched.table &&
      !errors.circuit &&
      !errors.table &&
      !errors.electors &&
      !errors.envelopes
    );
  };

  const isVoteSumExceeded = (votes: TelegramData['votes']) =>
    Object.values(votes).reduce((acc, curr) => acc + curr, 0) > 600;

  const getDifferenceMessage = (data: TelegramData): string => {
    const { electors, envelopes } = data;
    const difference = Math.abs(electors! - envelopes!);

    if (!electors) {
      return 'Sin información';
    } else if (difference <= 0) {
      return 'Sin diferencia';
    } else if (difference <= 5) {
      const pluralSingular = difference > 1 ? 'sobres' : 'sobre';
      return `Diferencia de ${difference} ${pluralSingular} con respecto a los electores`;
    } else {
      return 'Sin información';
    }
  };

  const onSubmitForm = async (
    values: TelegramData,
    errors: FormikErrors<TelegramData>,
    comesFromReport: boolean,
  ) => {
    setIsSubmitting(true);

    if (Object.keys(errors).length > 0 && !comesFromReport) {
      setIsDialogOpen(true);
      setIsSubmitting(false);
    } else {
      const userToken = sessionStorage.getItem('token');
      const userId = sessionStorage.getItem('uid');

      try {
        const endpoint = import.meta.env.VITE_REACT_backend_endpoint;

        const payload = new FormData();
        payload.append('mesaId', mesa || '');
        payload.append('userId', userId || '');

        payload.append('conteoUp', values.votes.uxp.toString() || '');
        payload.append('conteoLla', values.votes.lla.toString() || '');
        payload.append(
          'votosImpugnados',
          values.votes.identity.toString() || '',
        );
        payload.append('votosNulos', values.votes.null.toString() || '');
        payload.append('votosEnBlanco', values.votes.blank.toString() || '');
        payload.append(
          'votosRecurridos',
          values.votes.disputed.toString() || '',
        );

        payload.append(
          'votosEnTotal',
          Object.values(values.votes)
            .reduce((acc, curr) => acc + curr, 0)
            .toString() || '',
        );

        if (file) {
          const compressedFile = await handleImageUpload(file);
          payload.append('imagenActa', compressedFile || '');
        } else {
          throw new Error('No se proporcionó ningún archivo.');
        }
        setCompletedForm(true);
        // Hago post al endpoint de actas de la API
        const response = await axios.post(`${endpoint}/v1/actas`, payload, {
          headers: {
            'Content-Type': '',
            Authorization: userToken,
          },
        });
        if (response.status !== 201) {
          setIsSubmitting(false);
          console.error('Error sending data:', response.statusText);
          return navigate(paths.uploadFailed);
        }

        setIsSubmitting(false);
        saveActas(payload);

        return comesFromReport
          ? navigate(paths.sendWarning)
          : navigate(paths.sendSuccess);
      } catch (error) {
        setIsSubmitting(false);
        console.error('Error:', error);
        navigate(paths.uploadFailed);
      }
    }
  };

  const onReportTable = (
    values: TelegramData,
    errors: FormikErrors<TelegramData>,
    comesFromReport: boolean,
  ) => {
    errors = {};
    setIsDialogOpen(false);
    onSubmitForm(values, errors, comesFromReport);
  };

  // Función para compresión de imágenes
  const handleImageUpload = async (imageFile: File) => {
    const options = {
      maxSizeMB: 5,
      useWebWorker: true,
      alwaysKeepResolution: true,
      initialQuality: 1,
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);
      return compressedFile;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar routerLink="/acta/subir" />
      <main className="container mx-auto p-4 flex flex-col gap-[30px] max-w-[52.5rem]">
        <ProgressIndicator
          steps={[
            ProgressStepStatus.Successful,
            ProgressStepStatus.Successful,
            ProgressStepStatus.Active,
          ]}
        />
        <h1 className="py-8 text-neutral-700 text-xl font-semibold lg:text-3xl">
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
            setErrors,
          }) => (
            <Form className="flex flex-col gap-8">
              <section className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:mb-4">
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
                  value={mesa}
                  label="Mesa"
                  id="table-select"
                  name="table"
                  variant="outlined"
                  placeholder="00000/0"
                  select
                  onChange={(e) => setMesa(e.target.value)}
                  onBlur={handleBlur}
                  InputProps={{ style: { borderRadius: '8px' } }}
                  error={!!errors.table}
                >
                  {mesas.map((mesa, index) => (
                    <MenuItem key={index} value={mesa}>
                      {mesa.split('-').pop()}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Nro de electores"
                  name="electors"
                  variant="outlined"
                  {...validationProps()}
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
                  {...validationProps()}
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
                <h2 className="text-sm text-left text-gray-darker lg:text-lg lg:my-2">
                  Diferencia
                </h2>
                <Alert
                  error={!!errors.validVotesDifference}
                  message={
                    errors.validVotesDifference || getDifferenceMessage(values)
                  }
                />
              </section>
              <hr className="w-full border-x border-gray-300/50" />
              <section className="flex flex-col gap-[30px]">
                <section className="flex flex-col gap-4">
                  <CategoryVoteInput
                    name="votes.lla"
                    disabled={!isTableDataValid(touched, errors)}
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
                    name="votes.null"
                    disabled={!isTableDataValid(touched, errors)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    icon={<XSquare size={40} className="p-1" color="#908DA8" />}
                    title="Votos nulos"
                  />
                  <CategoryVoteInput
                    name="votes.disputed"
                    disabled={!isTableDataValid(touched, errors)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    icon={<Scales size={40} className="p-1" color="#908DA8" />}
                    title="Votos recurridos"
                  />
                  <CategoryVoteInput
                    name="votes.identity"
                    disabled={!isTableDataValid(touched, errors)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    icon={
                      <UserFocus size={40} className="p-1" color="#908DA8" />
                    }
                    title="Votos identidad impugnada"
                  />
                  <CategoryVoteInput
                    name="votes.command"
                    disabled={!isTableDataValid(touched, errors)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    icon={<Users size={40} className="p-1" color="#908DA8" />}
                    title="Votos de comando electoral"
                  />
                  <CategoryVoteInput
                    name="votes.blank"
                    disabled={!isTableDataValid(touched, errors)}
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
                  type="button"
                  onClick={() => onSubmitForm(values, errors, false)}
                  disabled={
                    !isTableDataValid(touched, errors) ||
                    !values.formAgreement ||
                    !!errors.votes ||
                    isVoteSumExceeded(values.votes) ||
                    isSubmitting
                  }
                  appearance={
                    !isTableDataValid(touched, errors) ||
                    !values.formAgreement ||
                    !!errors.votes ||
                    isVoteSumExceeded(values.votes)
                      ? 'disabled'
                      : !errors.validTotalVotes && !errors.validVotesDifference
                        ? 'filled'
                        : 'error'
                  }
                  className="lg:max-w-xs lg:mx-auto"
                  isLoading={isSubmitting}
                >
                  Enviar datos
                </Button>
              </section>
              <Dialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                className="fixed inset-0 bg-black/25 backdrop-blur-sm z-20 flex justify-center items-center"
              >
                <Dialog.Panel className="fixed z-30 bg-white max-w-xs lg:max-w-md rounded-xl px-4 py-8 lg:px-10">
                  <div className="flex flex-col items-center">
                    <div className="bg-red/5 p-6 rounded-full mb-4">
                      <img
                        src={forcedWarn}
                        alt="warning icon"
                        className="h-10 w-10"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-center leading-5 text-red">
                        Los datos ingresados presentan discrepancias.
                      </p>
                      <p className="text-center leading-5">
                        ¿Desea enviar estos datos de todas formas?
                      </p>
                    </div>
                  </div>
                  <section className="flex flex-row gap-2 mt-[34px] lg:gap-5">
                    <Button
                      appearance="outlined"
                      size="md"
                      className="!text-base h-14"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Volver
                    </Button>
                    <Button
                      appearance="filled"
                      size="md"
                      className="!text-base h-14 bg-violet-primary"
                      onClick={() => onReportTable(values, errors, true)}
                    >
                      Enviar
                    </Button>
                  </section>
                </Dialog.Panel>
              </Dialog>
            </Form>
          )}
        </Formik>
      </main>
    </>
  );
}

export const LoadInformation = LoadInformationPage;

export default LoadInformation;
