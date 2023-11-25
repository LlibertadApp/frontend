import { Formik, Form, FormikErrors, FormikTouched } from 'formik';
import imageCompression from 'browser-image-compression';
import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { TelegramData } from './types';

import { TextField, MenuItem } from '@mui/material';
import { Dialog } from '@headlessui/react';
import { XSquare, Scales, UserFocus, Users, NoteBlank } from '@phosphor-icons/react';
import forcedWarn from '/assets/icon/warn-icon.svg';

import { validationProps } from '#/utils/validationProps';
import { useActas } from '#/hooks/utils/useActas';
import { validationSchema } from './yup';

import { useCertificate } from '#/context/CertificationContext';
import { useAuth } from '#/context/AuthContext';

import { paths } from '#/routes/paths';

import { ProgressStepStatus } from '#/components/progressIndicator/types';
import CategoryVoteInput from '#/components/categoryVoteInput';
import ProgressIndicator from '#/components/progressIndicator';
import Checkbox from '#/components/checkbox/checkbox';
import Button from '#/components/button';
import Navbar from '#/components/navbar';
import Alert from '#/components/alert';
import { useTranslation } from 'react-i18next';

const isTableDataValid = (touched: FormikTouched<TelegramData>, errors: FormikErrors<TelegramData>) => {
    return touched.table && !errors.circuit && !errors.table && !errors.electors && !errors.envelopes;
};

const isVoteSumExceeded = (votes: TelegramData['votes']) => Object.values(votes).reduce((acc, curr) => acc + curr, 0) > 600;

const getDifferenceMessage = (data: TelegramData, t: (str: string, any?: any) => string): string => {
    const { electors, envelopes } = data;
    const difference = Math.abs(electors! - envelopes!);

    if (!electors) {
        return t('no_information');
    } else if (difference <= 0) {
        return t('no_difference');
    } else if (difference <= 5) {
        const pluralSingular = difference > 1 ? t('envelopes') : t('envelope');
        return t('difference_message', {
            difference,
            pluralSingular,
        });
    } else {
        return t('no_information');
    }
};

function LoadInformation() {
    const navigate = useNavigate();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { file, completedForm, setCompletedForm } = useCertificate();
    const { mesas } = useAuth();
    const [mesa, setMesa] = useState<string | undefined>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { saveActas } = useActas(); // Usa el Hook creado
    const { t } = useTranslation('loadInformation');

    useEffect(() => {
        if (completedForm) {
            navigate(paths.uploadActa);
        }
    }, []);

    const initialValues = useMemo<TelegramData>(
        () => ({
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
        }),
        [mesas]
    );

    const onSubmitForm = async (values: TelegramData, errors: FormikErrors<TelegramData>, comesFromReport: boolean) => {
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
                payload.append('votosImpugnados', values.votes.identity.toString() || '');
                payload.append('votosNulos', values.votes.null.toString() || '');
                payload.append('votosEnBlanco', values.votes.blank.toString() || '');
                payload.append('votosRecurridos', values.votes.disputed.toString() || '');

                payload.append('sobres', values.envelopes?.toString() || '');
                payload.append('votantes', values.electors?.toString() || '');

                payload.append(
                    'votosEnTotal',
                    Object.values(values.votes)
                        .reduce((acc, curr) => acc + curr, 0)
                        .toString() || ''
                );

                if (file) {
                    const compressedFile = await handleImageUpload(file);
                    payload.append('imagenActa', compressedFile || '');
                } else {
                    throw new Error(t('no_file_provided'));
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

                return comesFromReport ? navigate(paths.sendWarning) : navigate(paths.sendSuccess);
            } catch (error) {
                setIsSubmitting(false);
                console.error('Error:', error);
                navigate(paths.uploadFailed);
            }
        }
    };

    const onReportTable = (values: TelegramData, errors: FormikErrors<TelegramData>, comesFromReport: boolean) => {
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
                <ProgressIndicator steps={[ProgressStepStatus.Successful, ProgressStepStatus.Successful, ProgressStepStatus.Active]} />
                <h1 className="py-8 text-neutral-700 text-xl font-semibold lg:text-3xl">{t('complete_certificate_data')}</h1>
                <Formik onSubmit={() => {}} initialValues={initialValues} validationSchema={validationSchema} validateOnBlur validateOnChange>
                    {({ values, touched, handleChange, handleBlur, errors }) => (
                        <Form className="flex flex-col gap-8">
                            <section className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:mb-4">
                                <TextField
                                    disabled
                                    label={t('circuit')}
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
                                    label={t('table')}
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
                                    {mesas
                                        .filter(
                                            (mesa) =>
                                                !JSON.parse(sessionStorage.getItem('actas') || '[]')
                                                    .map((acta: { mesaId: string }) => acta.mesaId)
                                                    .includes(mesa)
                                        )
                                        .map((mesa, index) => (
                                            <MenuItem key={index} value={mesa}>
                                                {mesa.split('-').pop()}
                                            </MenuItem>
                                        ))}
                                </TextField>
                                <TextField
                                    label={t('number_of_voters')}
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
                                    label={t('envelopes')}
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
                                <h2 className="text-sm text-left text-gray-darker lg:text-lg lg:my-2">{t('diference')}</h2>
                                <Alert
                                    error={!!errors.validVotesDifference}
                                    message={errors.validVotesDifference || getDifferenceMessage(values, t)}
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
                                        title={t('null_votes')}
                                    />
                                    <CategoryVoteInput
                                        name="votes.disputed"
                                        disabled={!isTableDataValid(touched, errors)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        icon={<Scales size={40} className="p-1" color="#908DA8" />}
                                        title={t('challenged_votes')}
                                    />
                                    <CategoryVoteInput
                                        name="votes.identity"
                                        disabled={!isTableDataValid(touched, errors)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        icon={<UserFocus size={40} className="p-1" color="#908DA8" />}
                                        title={t('contested_identity_votes')}
                                    />
                                    <CategoryVoteInput
                                        name="votes.command"
                                        disabled={!isTableDataValid(touched, errors)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        icon={<Users size={40} className="p-1" color="#908DA8" />}
                                        title={t('electoral_command_votes')}
                                    />
                                    <CategoryVoteInput
                                        name="votes.blank"
                                        disabled={!isTableDataValid(touched, errors)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        icon={<NoteBlank size={40} className="p-1" color="#908DA8" />}
                                        title={t('blank_votes')}
                                    />
                                </section>
                                <Alert error={!!errors.validTotalVotes} message={errors.validTotalVotes || t('sum_matches_envelopes')} />
                                <Checkbox name="formAgreement" label={t('verify_data')} checked={values.formAgreement} onChange={handleChange} />
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
                                    {t('send_data')}
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
                                            <img src={forcedWarn} alt="warning icon" className="h-10 w-10" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <p className="text-center leading-5 text-red">{t('data_discrepancies')}</p>
                                            <p className="text-center leading-5">{t('send_data_confirmation')}</p>
                                        </div>
                                    </div>
                                    <section className="flex flex-row gap-2 mt-[34px] lg:gap-5">
                                        <Button appearance="outlined" size="md" className="!text-base h-14" onClick={() => setIsDialogOpen(false)}>
                                            {t('go_back')}
                                        </Button>
                                        <Button
                                            appearance="filled"
                                            size="md"
                                            className="!text-base h-14 bg-violet-primary"
                                            onClick={() => onReportTable(values, errors, true)}
                                        >
                                            {t('send')}
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

export default LoadInformation;
