import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import Button from '#/components/button';
import FlatList from '#/components/flatList';
import ProgressIndicator from '#/components/progressIndicator';
import Navbar from '#/components/navbar';
import { FlatListTypeEnum } from '#/components/flatList/types';
import { ProgressStepStatus } from '#/components/progressIndicator/types';
import { ILoadInformationProps, FormValues } from './types';

import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';

const LoadInformationPage: FC<ILoadInformationProps> = () => {
  const [progressStatus, setProgressStatus] = useState([
    ProgressStepStatus.Successful,
    ProgressStepStatus.Successful,
    ProgressStepStatus.Active,
  ]);

  const initialValues: FormValues = {
    circuit: '',
    table: '',
    electors: '',
    envelopes: '',
    votesDifference: false,
    correctCertificateData: false,
    totalVotes: 0,
    correctData: false,
  };

  const validationSchema = Yup.object().shape({
    circuit: Yup.number().min(0).required(''),
    table: Yup.number().min(0).required(''),
    electors: Yup.number().min(0).required(''),
    envelopes: Yup.number().min(0).required(''),
    totalVotes: Yup.number().min(0).required(''),
    votesDifference: Yup.boolean().test(
      'votesDifference',
      (values, context) => {
        const { electors, envelopes } = context.parent;
        const electorsEnvelopesDiff = electors - envelopes;
        return !(electorsEnvelopesDiff > 4 || electorsEnvelopesDiff < 0);
      },
    ),
    correctCertificateData: Yup.boolean().test(
      'correctCertificateData',
      (values, context) => {
        const { votesDifference, circuit, table, electors, envelopes } =
          context.parent;
        return (
          !votesDifference &&
          circuit !== 0 &&
          table !== 0 &&
          electors !== 0 &&
          envelopes !== 0
        );
      },
    ),
  });

  const onSubmit = async (values: FormValues) => {
    console.log(values);
  };

  const selectedInputStyle: string = 'border-2 border-violet-brand !text-black';
  const errorInputStyle: string = 'border-2 !border-red !text-red';

  const flatList = [
    {
      logo: 'assets/logos/lla-logo.svg',
      type: FlatListTypeEnum.milei,
      subTitle: 'Milei',
      title: 'Javier Gerardo',
      votes: 0,
      edit: true,
    },
    {
      logo: 'assets/logos/uxp.svg',
      type: FlatListTypeEnum.massa,
      subTitle: 'Massa',
      title: 'Sergio Tomas',
      votes: 0,
      edit: true,
    },
    {
      logo: 'assets/icon/mail-invalid.svg',
      type: FlatListTypeEnum.null,
      subTitle: '',
      title: 'Votos nulos',
      votes: 0,
      edit: true,
    },
    {
      logo: 'assets/icon/mail-appealed.svg',
      type: FlatListTypeEnum.appealed,
      subTitle: '',
      title: 'Votos recurridos',
      votes: 0,
      edit: true,
    },
    {
      logo: 'assets/icon/mail-contested.svg',
      type: FlatListTypeEnum.contested,
      subTitle: '',
      title: 'Votos identidad impugnada',
      votes: 0,
      edit: true,
    },
    {
      logo: 'assets/icon/mail-person.svg',
      type: FlatListTypeEnum.electoralCommand,
      subTitle: '',
      title: 'Votos de comando electoral',
      votes: 0,
      edit: true,
    },
    {
      logo: 'assets/icon/mail-closed.svg',
      type: FlatListTypeEnum.blank,
      subTitle: '',
      title: 'Votos en blanco',
      votes: 0,
      edit: true,
    },
  ];

  return (
    <section className="bg-white items-center flex flex-col">
      <Navbar routerLink="/verify-certificate" />
      <div className="container mx-auto p-2">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, values, setFieldValue }) => {
            const [totalVotes, setTotalVotes] = useState<number>(0);
            const [correctCertificate, setCorrectCertificate] =
              useState<boolean>(false);

            const preventNegativeValues = (
              e: React.ChangeEvent<HTMLInputElement>,
              setFieldValue: FormikHelpers<FormValues>['setFieldValue'],
            ) => {
              const { name, value } = e.target;
              const newValue = Math.max(0, parseInt(value, 10));
              setFieldValue(name, newValue);
            };

            const updateCorrectCertificateData = (
              values: FormValues,
              setFieldValue: FormikHelpers<FormValues>['setFieldValue'],
            ) => {
              const { circuit, table, electors, envelopes, votesDifference } =
                values;
              circuit && table && electors && envelopes && !votesDifference
                ? setFieldValue('correctCertificateData', true)
                : setFieldValue('correctCertificateData', false);
            };

            const updateVotesDifference = (
              values: FormValues,
              setFieldValue: FormikHelpers<FormValues>['setFieldValue'],
            ) => {
              const { electors, envelopes } = values;
              typeof electors === 'number' &&
                typeof envelopes === 'number' &&
                (electors - envelopes > 4 || electors - envelopes < 0
                  ? setFieldValue('votesDifference', true)
                  : setFieldValue('votesDifference', false));
            };

            const updateProgressStatus = (values: FormValues) => {
              const { totalVotes, votesDifference } = values;
              setProgressStatus([
                ProgressStepStatus.Successful,
                ProgressStepStatus.Successful,
                !(totalVotes || votesDifference)
                  ? ProgressStepStatus.Active
                  : ProgressStepStatus.Error,
              ]);
            };

            const updateTotalVotes = (newValue: number) => {
              setTotalVotes((prevTotal: number) => prevTotal + newValue);
            };

            console.log(values);

            return (
              <Form>
                <div className="flex items-center justify-center">
                  <ProgressIndicator steps={progressStatus} />
                </div>
                <div className="py-8 text-neutral-700 text-xl font-bold">
                  Cargar datos del certificado
                </div>
                <div className="flex flex-row w-full justify-center gap-[20vw] sm:gap-24 px-4">
                  <div>
                    <label
                      className="inline-block my-2 text-violet-brand font-bold text-xl"
                      htmlFor="circuit"
                    >
                      Circuito
                    </label>
                    <Field
                      type="number"
                      name="circuit"
                      placeholder="000D"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        preventNegativeValues(e, setFieldValue);
                        updateProgressStatus(values);
                        updateCorrectCertificateData(values, setFieldValue);
                      }}
                      className={`border-2 text-center border-gray-300 outline-none cursor-default bg-white text-neutral-500 font-bold rounded-xl h-12 w-32 flex text-2xl ${
                        values.circuit ? selectedInputStyle : ''
                      } ${
                        touched.circuit && errors.circuit ? errorInputStyle : ''
                      } `}
                    />
                  </div>
                  <div>
                    <label
                      className="inline-block my-2 text-violet-brand font-bold text-xl"
                      htmlFor="table"
                    >
                      Mesa
                    </label>
                    <Field
                      type="number"
                      name="table"
                      placeholder="00000/0"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        preventNegativeValues(e, setFieldValue);
                        updateProgressStatus(values);
                        updateCorrectCertificateData(values, setFieldValue);
                      }}
                      className={`border-2 text-center border-gray-300 outline-none cursor-default bg-white text-neutral-500 font-bold rounded-xl h-12 w-32 flex text-2xl ${
                        values.table ? selectedInputStyle : ''
                      } ${
                        touched.table && errors.table ? errorInputStyle : ''
                      }`}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center w-full p-2">
                  <div className="flex p-2 justify-between items-center w-full  max-w-md ">
                    <label
                      className="text-xl text-neutral-700 font-bold px-3 py-5 tracking-wide"
                      htmlFor="electors"
                    >
                      Cantidad de electores
                    </label>
                    <Field
                      type="number"
                      name="electors"
                      placeholder="0"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        preventNegativeValues(e, setFieldValue);
                        updateProgressStatus(values);
                        updateVotesDifference(values, setFieldValue);
                        updateCorrectCertificateData(values, setFieldValue);
                      }}
                      className={`border-2 text-center border-gray-300 outline-none cursor-default bg-white text-neutral-500 font-bold rounded-xl h-12 w-32 flex text-2xl 
              ${values.electors ? selectedInputStyle : ''}
              ${
                errors.votesDifference && touched.electors
                  ? errorInputStyle
                  : ''
              }`}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center w-full p-2">
                  <div className="flex p-2 justify-between items-center w-full  max-w-md ">
                    <label
                      className="text-xl text-neutral-700 font-bold px-3 py-5 tracking-wide"
                      htmlFor="envelopes"
                    >
                      Cantidad de sobres
                    </label>
                    <Field
                      type="number"
                      name="envelopes"
                      placeholder="0"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        preventNegativeValues(e, setFieldValue);
                        updateProgressStatus(values);
                        updateVotesDifference(values, setFieldValue);
                        updateCorrectCertificateData(values, setFieldValue);
                      }}
                      className={`border-2 text-center border-gray-300 outline-none cursor-default bg-white text-neutral-500 font-bold rounded-xl h-12 w-32 flex text-2xl 
                    ${values.envelopes ? selectedInputStyle : ''}
              ${
                errors.votesDifference && touched.envelopes
                  ? errorInputStyle
                  : ''
              }`}
                    />
                  </div>
                </div>
                <hr className="h-[2px] my-1 bg-gray-400/50 border-0 max-w-md mx-auto"></hr>
                <div className={`flex items-center justify-center w-full p-2`}>
                  <div
                    className={`flex p-2 justify-between items-center w-full max-w-md text-neutral-700 ${
                      errors.votesDifference ? '!text-red' : null
                    } ${values.correctCertificateData ? '!text-green' : null}`}
                  >
                    <div
                      className={`text-xl font-bold px-3 py-5 tracking-wide`}
                    >
                      {values.electors !== 0 ? (
                        <div className="flex flex-row gap-2">
                          Diferencia{' '}
                          {values.correctCertificateData &&
                          !values.votesDifference ? (
                            <span className="font-light">(habilitada)</span>
                          ) : null}{' '}
                          {errors.votesDifference &&
                          !values.correctCertificateData ? (
                            <span className="font-light">(impugnada)</span>
                          ) : null}
                        </div>
                      ) : (
                        <div className="">Diferencia</div>
                      )}
                    </div>
                    <div className="text-2xl font-semibold px-3 py-5 mr-10">
                      {isNaN(Number(values.electors) - Number(values.envelopes))
                        ? 0
                        : Number(values.electors) - Number(values.envelopes)}
                    </div>
                  </div>
                </div>
                <hr className="h-[2px] my-1 bg-gray-400/50 border-0 max-w-md mx-auto"></hr>
                <div className="flex flex-col items-center justify-center my-6 w-full p-2">
                  {flatList.map((item, index) => (
                    <Field key={index} name={`flatList.${index}`}>
                      {(
                        { field }: any, // kjjjjj
                      ) => (
                        <FlatList
                          {...field}
                          logo={item.logo}
                          type={item.type}
                          subTitle={item.subTitle}
                          title={item.title}
                          votes={item.votes}
                          edit={item.edit}
                          updateTotalVotes={updateTotalVotes}
                          correctCertificate={values.correctCertificateData}
                        />
                      )}
                    </Field>
                  ))}
                </div>
                <div className="flex items-center justify-center my-6 w-full p-2">
                  <div className="flex p-2 justify-between items-center w-full max-w-md">
                    <div
                      className={`text-3xl text-violet-brand font-bold px-3 py-5 tracking-wide ${
                        typeof values.envelopes === 'number' &&
                        typeof totalVotes === 'number'
                          ? values.envelopes - totalVotes !== 0
                            ? 'text-red'
                            : ''
                          : ''
                      }`}
                    >
                      {typeof values.envelopes === 'number' ? (
                        values.envelopes - totalVotes !== 0 ? (
                          <div className="flex flex-row gap-2">
                            Total{' '}
                            <img
                              src="/assets/icon/warn-icon.svg"
                              alt="warn-icon"
                            />
                          </div>
                        ) : (
                          'Total'
                        )
                      ) : (
                        'Total'
                      )}
                    </div>

                    <div
                      className={`text-2xl font-semibold px-3 py-5 mr-10 ${
                        typeof values.envelopes === 'number' &&
                        typeof totalVotes === 'number'
                          ? values.envelopes - totalVotes !== 0
                            ? 'text-red'
                            : ''
                          : ''
                      }`}
                    >
                      {totalVotes}
                    </div>
                  </div>
                </div>
                <div className="text-base text-red max-w-md mx-auto text-left -mt-16 p-5">
                  {typeof values.envelopes === 'number' &&
                    typeof totalVotes === 'number' &&
                    (values.envelopes - totalVotes !== 0
                      ? 'El total de votos no coincide con la cantidad de sobres. Revisa los datos cargados'
                      : null)}
                </div>

                <div className="flex items-center justify-center text-sm my-10">
                  <div className="flex items-center px-4">
                    <div className="inline-flex items-center">
                      <label
                        className="relative flex items-center p-3 rounded-full cursor-pointer"
                        data-ripple-dark="true"
                      >
                        <Field
                          type="checkbox"
                          name="correctData"
                          checked={values.correctData}
                          className="before:content[''] peer relative h-7 w-7 cursor-pointer appearance-none rounded-md border-2 border-violet-brand transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-violet-brand checked:bg-violet-brand checked:before:bg-violet-500 hover:before:opacity-10"
                        />

                        <div className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                          <img
                            src="/assets/icon/check-icon.svg"
                            alt="check"
                          />
                        </div>
                      </label>
                    </div>
                    <div
                      className="px-3 cursor-pointer"
                      onClick={() =>
                        setFieldValue('correctData', !values.correctData)
                      }
                    >
                      <h3 className="text-start text-base">
                        Verifico que controlé y que todos los datos son
                        correctos.
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center my-10">
                  {typeof values.electors === 'number' &&
                  typeof values.envelopes === 'number' &&
                  typeof totalVotes === 'number' &&
                  typeof values.circuit === 'number' &&
                  typeof values.table === 'number' &&
                  values.electors - values.envelopes >= 0 &&
                  values.electors - values.envelopes <= 4 &&
                  values.envelopes - totalVotes === 0 &&
                  totalVotes !== 0 &&
                  values.circuit !== 0 &&
                  values.table !== 0 &&
                  values.correctData ? (
                    <Link to="/send-success" className="w-full mx-6">
                      <Button
                        className="bg-violet-brand p-4 text-white rounded-xl font-medium text-xl tracking-wider w-full"
                        type="submit"
                        label="Enviar Datos"
                      />
                    </Link>
                  ) : (
                    <div className="w-full mx-6">
                      <Button
                        className={
                          values.votesDifference && values.correctData
                            ? 'bg-red p-4 text-white rounded-xl font-medium text-xl tracking-wider w-full'
                            : 'bg-gray-300 p-4 text-black rounded-xl font-medium text-xl tracking-wider w-full cursor-default'
                        }
                        type={values.correctData ? 'submit' : 'button'}
                        label={
                          values.votesDifference
                            ? 'Impugnar mesa'
                            : 'Enviar datos'
                        }
                      />
                    </div>
                  )}
                </div>
              </Form>
            );
          }}
        </Formik>
        <div className="flex items-center justify-center my-10">
          <Button
            className="text-red bg-transparent p-3 w-full rounded-xl text-xl"
            type="button"
            label="Denunciar Irregularidad"
          />
        </div>
      </div>
    </section>
  );
};

export const LoadInformation = observer(LoadInformationPage);

export default LoadInformation;
