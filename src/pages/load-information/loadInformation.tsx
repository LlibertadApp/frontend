import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import toast, { Toaster } from 'react-hot-toast';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import { ILoadInformationProps, FormValues } from './types';

import { paths } from '#/routes/paths';

import Button from '#/components/button';
import FlatList from '#/components/flatList';
import ProgressIndicator from '#/components/progressIndicator';
import Navbar from '#/components/navbar';
import { FlatListTypeEnum } from '#/components/flatList/types';
import { ProgressStepStatus } from '#/components/progressIndicator/types';
import { TextField } from '@mui/material';


const LoadInformationPage: FC<ILoadInformationProps> = () => {
  const selectedInputStyle: string = 'border-2 border-violet-brand !text-black';
  const errorInputStyle: string = 'border-2 !border-red !text-red-error';

  const flatList = [
    {
      logo: 'assets/logos/lla-min.svg',
      type: FlatListTypeEnum.milei,
      subTitle: 'Milei',
      title: 'Javier Gerardo',
      votes: '',
      edit: true,
    },
    {
      logo: 'assets/logos/uxp-min.svg',
      type: FlatListTypeEnum.massa,
      subTitle: 'Massa',
      title: 'Sergio Tomas',
      votes: '',
      edit: true,
    },
    {
      logo: 'assets/icon/mail-invalid.svg',
      type: FlatListTypeEnum.null,
      subTitle: '',
      title: 'Votos nulos',
      votes: '',
      edit: true,
    },
    {
      logo: 'assets/icon/mail-appealed.svg',
      type: FlatListTypeEnum.appealed,
      subTitle: '',
      title: 'Votos recurridos',
      votes: '',
      edit: true,
    },
    {
      logo: 'assets/icon/mail-contested.svg',
      type: FlatListTypeEnum.contested,
      subTitle: '',
      title: 'Votos identidad impugnada',
      votes: '',
      edit: true,
    },
    {
      logo: 'assets/icon/mail-person.svg',
      type: FlatListTypeEnum.electoralCommand,
      subTitle: '',
      title: 'Votos de comando electoral',
      votes: '',
      edit: true,
    },
    {
      logo: 'assets/icon/mail-closed.svg',
      type: FlatListTypeEnum.blank,
      subTitle: '',
      title: 'Votos en blanco',
      votes: '',
      edit: true,
    },
  ];

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
    totalVotes: 0,
    correctData: false,
  };

  const validationSchema = Yup.object().shape({
    circuit: Yup.number().min(0).required(''),
    table: Yup.number().min(0).required(''),
    electors: Yup.number().min(0).positive().required(''),
    envelopes: Yup.number().min(0).positive().required(''),
    totalVotes: Yup.number().min(0).positive().required(''),
    correctData: Yup.boolean().required(''),
  });

  const onSubmit = async (values: FormValues) => {
    values.totalVotes = totalVotes;
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [totalVotes, setTotalVotes] = useState<number>(0);
  const [correctCertificate, setCorrectCertificate] = useState<boolean>(false);
  const [votesDifference, setVotesDifference] = useState<boolean>(false);

  const getValidationProps = () => {
    return {
      onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
        const forbiddenKeys = [
          'e',
          'E',
          '+',
          '-',
          ',',
          '.',
          'ArrowUp',
          'ArrowDown',
        ];
        if (forbiddenKeys.includes(e.key)) {
          e.preventDefault();
        }
      },
      onPaste: (e: React.ClipboardEvent<HTMLInputElement>) =>
        e.preventDefault(),
      onContextMenu: (e: React.MouseEvent<HTMLInputElement>) =>
        e.preventDefault(),
      onDrop: (e: React.DragEvent<HTMLInputElement>) => e.preventDefault(),
      onWheel: (e: React.WheelEvent<HTMLInputElement>) => {
        if (e.target instanceof HTMLElement) {
          e.target.blur();
        }
      },
      autoComplete: 'off',
    };
  };

  const updateCorrectCertificateData = (values: FormValues) => {
    const { circuit, table, electors, envelopes } = values;
    circuit && table && electors && (envelopes || envelopes === 0)
      ? setCorrectCertificate(true)
      : setCorrectCertificate(false);
  };

  const updateVotesDifference = (values: FormValues) => {
    const { electors, envelopes } = values;
    typeof electors === 'number' &&
      typeof envelopes === 'number' &&
      (electors - envelopes < 0
        ? setVotesDifference(true)
        : setVotesDifference(false));
  };

  useEffect(() => {
    updateVotesDifference(formValues);
    updateCorrectCertificateData(formValues);
    updateProgressStatus();
  }, [totalVotes, formValues, correctCertificate, votesDifference]);

  const updateProgressStatus = () => {
    setProgressStatus([
      ProgressStepStatus.Successful,
      ProgressStepStatus.Successful,
      formValues.correctData && correctCertificate && !votesDifference
        ? ProgressStepStatus.Active
        : ProgressStepStatus.Error,
    ]);
  };

  const updateTotalVotes = (newValue: number) => {
    setTotalVotes((prevTotal: number) => prevTotal + newValue);
  };
  const handleToast = (type: string) => {
    try {
      if (type === 'submit') {
        toast.success('Se está cargando la información...', {
          icon: '✔',
        });
      } else {
        toast.error(
          'Debes completar TODOS los datos requeridos, y aceptar el boton de verificación',
          {
            icon: '⛔',
          },
        );
      }
    } catch (error) {
      toast.error('Oh oh algo está mal... Por favor, actualice la página', {
        icon: '♻',
      });
    } finally {
    }
  };

  return (
    <section className="bg-white items-center flex flex-col">
      <Navbar routerLink="/verify-certificate" />
      <div className="container mx-auto p-4">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, values, setFieldValue, handleChange }) => {
            useEffect(() => {
              setFormValues(values);
            }, [values]);
            return (
              <Form>
                <div className="flex items-center justify-center">
                  <ProgressIndicator steps={progressStatus} />
                </div>
                <div className="py-8 text-neutral-700 text-xl font-bold">
                  Completá los datos del <br />
                  certificado
                </div>

                <div className="flex w-full justify-center gap-6 sm:gap-24">
                  <div>
                    <TextField
                      InputLabelProps={{ style: { opacity: '0.6' } }}
                      InputProps={{ style: { borderRadius: '8px' } }}
                      sx={{ width: '100%' }}
                      type="number"
                      label="Circuito"
                      name="circuit"
                      variant="outlined"
                      placeholder="000D"
                      {...getValidationProps()}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e);
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
                    ></label>
                    <TextField
                      InputLabelProps={{
                        style: { opacity: '0.6' },
                      }}
                      InputProps={{
                        style: { borderRadius: '8px' },
                      }}
                      sx={{ width: '100%' }}
                      type="number"
                      name="table"
                      label="Mesa"
                      placeholder="00000/0"
                      {...getValidationProps()}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e);
                      }}
                      className={`border-2 text-center border-gray-300 outline-none cursor-default bg-white text-neutral-500 font-bold rounded-xl h-12 w-32 flex text-2xl ${
                        values.table ? selectedInputStyle : ''
                      } ${
                        touched.table && errors.table ? errorInputStyle : ''
                      }`}
                    />
                  </div>
                </div>

                <div className="flex w-full justify-center gap-6 sm:gap-24">
                  <div className="py-6">
                    <TextField
                      InputLabelProps={{
                        style: { opacity: '0.6' },
                      }}
                      InputProps={{
                        style: { borderRadius: '8px' },
                      }}
                      sx={{ width: '100%' }}
                      type="number"
                      name="electors"
                      label="Nro de electores"
                      placeholder="0"
                      {...getValidationProps()}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e);
                      }}
                      className={`border-2 text-center border-gray-300 outline-none cursor-default bg-white text-neutral-500 font-bold rounded-xl h-12 w-32 flex text-2xl 
              ${values.electors ? selectedInputStyle : ''}
              ${votesDifference && touched.electors ? errorInputStyle : ''}`}
                    />
                  </div>

                  <div className="py-6">
                    <div className="">
                      <TextField
                        InputLabelProps={{
                          style: { opacity: '0.6' },
                        }}
                        InputProps={{
                          style: { borderRadius: '8px' },
                        }}
                        sx={{ width: '100%' }}
                        type="number"
                        name="envelopes"
                        label="Sobres"
                        placeholder="0"
                        {...getValidationProps()}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleChange(e);
                        }}
                        className={`border-2 text-center border-gray-300 outline-none cursor-default bg-white text-neutral-500 font-bold rounded-xl h-12 w-32 flex text-2xl
                    ${values.envelopes ? selectedInputStyle : ''}
              ${votesDifference && touched.envelopes ? errorInputStyle : ''}`}
                      />
                    </div>
                  </div>
                </div>
                <hr className="h-[2px] my-1 bg-gray-300/50 border-0 max-w-md mx-auto"></hr>
                <div className="flex flex-col justify-center w-full py-5">
                  <div className="text-left pl-1 pb-1 text-gray-darker">
                    Diferencia
                  </div>
                  <div
                    className={`flex justify-between items-center w-full px-3 !text-green-light bg-green-light/10 rounded-2xl ${
                      votesDifference ? '!text-red-error !bg-red-error/5' : null
                    } ${correctCertificate ? '' : null}`}
                  >
                    <div className="px-1 py-[14px] tracking-wide">
                      {values.electors !== 0 && (
                        <div className="flex flex-row gap-2">
                          <span>
                            {Number(values.electors) - Number(values.envelopes)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="font-2xl">
                      {!votesDifference ? (
                        <img src="/assets/icon/checkcircle.svg" alt="check" />
                      ) : (
                        <img src="/assets/icon/xcircle.svg" alt="error" />
                      )}
                    </div>
                  </div>
                </div>
                <hr className="h-[2px] my-1 bg-gray-300/50 border-0 max-w-md mx-auto"></hr>
                <div className="flex flex-col items-center justify-center mt-[30px] w-full gap-4">
                  {flatList.map((item, index) => (
                    <Field key={index} name={`flatList.${index}`}>
                      {({ field }: any) => (
                        <FlatList
                          {...field}
                          logo={item.logo}
                          type={item.type}
                          subTitle={item.subTitle}
                          title={item.title}
                          votes={item.votes}
                          edit={item.edit}
                          updateTotalVotes={updateTotalVotes}
                          getValidationProps={getValidationProps}
                          correctCertificate={correctCertificate}
                          isLastFive={index >= flatList.length - 5}
                        />
                      )}
                    </Field>
                  ))}
                </div>

                <div
                  className={`flex items-center justify-center my-5 px-3 py-[0.375rem] w-full text-violet-brand tracking-wide rounded-2xl ${
                    typeof values.envelopes === 'number'
                      ? values.envelopes - totalVotes !== 0
                        ? '!text-red-error bg-red-error/5'
                        : '!text-green-light bg-green-light/10'
                      : ''
                  }`}
                >
                  <div className="flex justify-between py-2 items-center w-full max-w-md">
                    <div>Votos totales: {totalVotes}</div>
                    {typeof values.envelopes === 'number' ? (
                      values.envelopes - totalVotes !== 0 ? (
                        <div>
                          <img src="/assets/icon/xcircle.svg" alt="error" />
                        </div>
                      ) : (
                        <div>
                          <img
                            src="/assets/icon/checkcircle.svg"
                            alt="success"
                          />
                        </div>
                      )
                    ) : null}
                  </div>
                </div>

                <div className="flex items-center justify-center text-sm pt-[0.625rem]">
                  <div className="flex items-center gap-2">
                    <div className="inline-flex items-center pb-[0.625rem]">
                      <label
                        className="relative flex items-center rounded-full cursor-pointer"
                        data-ripple-dark="true"
                      >
                        <Field
                          type="checkbox"
                          name="correctData"
                          checked={values.correctData}
                          className={`
                            before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border-2
                            ${
                              typeof values.envelopes === 'number'
                                ? (!correctCertificate && votesDifference) ||
                                  values.envelopes - totalVotes !== 0
                                  ? 'checked:border-red border-red checked:bg-red'
                                  : 'checked:border-green border-green checked:bg-green'
                                : 'checked:border-violet-primary border-violet-primary checked:bg-violet-primary'
                            }
                            transition-all before:absolute before:top-2/4 before:left-2/4 before:block 
                            before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 
                            before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity 
                            hover:before:opacity-10
                          `}
                        />
                        <div className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                          <img src="/assets/icon/check-icon.svg" alt="check" />
                        </div>
                      </label>
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        setFieldValue('correctData', !values.correctData)
                      }
                    >
                      <h3 className="text-left text-sm tracking-tight">
                        Verifico que controlé y que todos los datos son
                        correctos.
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center my-[1.875rem]">
                  {!votesDifference &&
                  !correctCertificate &&
                  totalVotes === 0 ? (
                    // case 1 - incomplete
                    <div className="w-full">
                      <Button
                        onClick={() =>
                          handleToast(
                            votesDifference &&
                              totalVotes !== 0 &&
                              values.circuit !== 0 &&
                              values.table !== 0 &&
                              values.correctData
                              ? 'submit'
                              : 'button',
                          )
                        }
                        className="bg-gray-300 p-[14px] text-black rounded-xl font-light text-[1.125rem] tracking-wider w-full cursor-default"
                        type="button"
                        label="Enviar datos"
                      />
                      <Toaster position="top-right" reverseOrder={false} />
                    </div>
                  ) : correctCertificate &&
                    !votesDifference &&
                    totalVotes === values.envelopes &&
                    values.correctData ? (
                    // case 2 - ok
                    <Link to={paths.sendSuccess} className="w-full">
                      <Button
                        onClick={() => onSubmit(values)}
                        className="bg-violet-primary p-[14px] text-white rounded-xl font-light text-[1.125rem] tracking-wider w-full"
                        type="submit"
                        label="Enviar datos"
                      />
                      <Toaster position="top-right" reverseOrder={false} />
                    </Link>
                  ) : (
                    // case 3 - something wrong
                    <Link to={paths.sendSuccess} className="w-full">
                      <Button
                        onClick={() => onSubmit(values)}
                        className="bg-red p-[14px] text-white rounded-xl font-light text-[1.125rem] tracking-wider w-full"
                        type="submit"
                        label="Enviar datos"
                      />
                      <Toaster position="top-right" reverseOrder={false} />
                    </Link>
                  )}
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </section>
  );
};

export const LoadInformation = observer(LoadInformationPage);

export default LoadInformation;
