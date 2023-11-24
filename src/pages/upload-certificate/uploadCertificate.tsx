import { CheckCircle } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import './styles.css';

import { paths } from '#/routes/paths';

import { useCertificate } from '#/context/CertificationContext';
import { useAuth } from '#/context/AuthContext';

import { ProgressStepStatus } from '#/components/progressIndicator/types';
import ProgressIndicator from '#/components/progressIndicator';
import UploadInput from '#/components/uploadInput';
import Navbar from '#/components/navbar';
import { useTranslation } from 'react-i18next';

const UploadCertificate = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('uploadCertificate')
  const { setFile, setCertificateImage, setCompletedForm } = useCertificate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0]!);
    setCertificateImage(e.target.files?.[0]!); // test
    setCompletedForm(false);
    navigate(paths.verifyActa);
  };

  const { mesas } = useAuth();
  const availableMesas = mesas.filter(
    (mesa) =>
      !JSON.parse(sessionStorage.getItem('actas') || '[]')
        .map((acta: { mesaId: string }) => acta.mesaId)
        .includes(mesa),
  );

  useEffect(() => {
    if (availableMesas.length === 0) {
      navigate(paths.home);
    }
  }, [availableMesas, navigate]);

  return (
    <>
      <Navbar routerLink={paths.home} />
      <main className="container mx-auto p-4 flex flex-col gap-[30px] max-w-[52.5rem]">
        <ProgressIndicator
          steps={[
            ProgressStepStatus.Active,
            ProgressStepStatus.Pending,
            ProgressStepStatus.Pending,
          ]}
        />
        <h1 className="text-neutral-700 text-xl font-medium text-center">
          {t('upload_image')}
        </h1>
        <p className="text-neutral-600 text-base">
          {t('use_camera_to_upload')}
        </p>
        <UploadInput
          id="largeCertificateInput"
          size="lg"
          onChange={handleImageUpload}
        />
        <ul className="flex flex-col gap-[15px]">
          <li className="flex flex-row gap-[8px] text-left">
            <CheckCircle className="text-green" size={24} />
            <span className="text-neutral-600 text-sm flex-1">
              {t('find_well_lit_place')}
            </span>
          </li>
          <li className="flex flex-row gap-[8px] text-left">
            <CheckCircle className="text-green" size={24} />
            <span className="text-neutral-600 text-sm flex-1">
              {t('ensure_all_data_visible')}
            </span>
          </li>
          <li className="flex flex-row gap-[8px] text-left">
            <CheckCircle className="text-green" size={24} />
            <span className="text-neutral-600 text-sm flex-1">
              {t('ensure_certificate_signed')}
            </span>
          </li>
        </ul>
        <UploadInput
          id="buttonCertificateInput"
          size="md"
          onChange={handleImageUpload}
        />
      </main>
    </>
  );
};

export default UploadCertificate;
