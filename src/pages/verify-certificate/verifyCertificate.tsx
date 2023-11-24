import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from '#/components/button';
import ProgressIndicator from '#/components/progressIndicator';
import Navbar from '#/components/navbar';
import { useCertificate } from '#/context/CertificationContext';
import { ProgressStepStatus } from '#/components/progressIndicator/types';
import './styles.css';
import { paths } from '#/routes/paths';
import Checkbox from '#/components/checkbox/checkbox';
import { useTranslation } from 'react-i18next';

function VerifyCertificate() {
  const navigate = useNavigate();
  const { t } = useTranslation('verifyCertificate')
  const [correctData, setCorrectData] = useState<boolean>(false);
  const { certificateImage, completedForm } =
    useCertificate();

  useEffect(() => {
    if (completedForm) {
      navigate(paths.verifyActa);
    }
  }, []);

  const handleContinue = () => {
    if (!correctData) return;
    navigate(paths.loadActaInfo);
  };

  const handleCheckbox = () => {
    setCorrectData((correctData) => !correctData);
  };

  return (
    <>
      <Navbar routerLink={paths.home} />
      <main className="container mx-auto p-4 flex flex-col gap-[30px] max-w-[52.5rem]">
        <ProgressIndicator
          steps={[
            ProgressStepStatus.Successful,
            ProgressStepStatus.Active,
            ProgressStepStatus.Pending,
          ]}
        />
        <h1 className="text-neutral-700 text-xl font-medium text-center">
          {t('upload_fiscal_certificate')}
        </h1>
        <p className="text-neutral-600 text-base">
          {t('check_clear_complete_image')}
        </p>
        {certificateImage && (
          <img
            src={URL.createObjectURL(certificateImage)}
            alt="uploaded image"
            className="object-cover rounded-2xl w-100 h-auto border-2"
          />
        )}
        <Checkbox
          label={t('verify_signed_by_president')}
          checked={correctData}
          onChange={handleCheckbox}
        />
        <section className="flex flex-col gap-4">
          <Button
            disabled={!correctData}
            type="button"
            onClick={handleContinue}
          >
            {t('continue')}
          </Button>
          <Link to={paths.uploadActa} className="w-full">
            <Button appearance="outlined" label={t('reload_image')} />
          </Link>
        </section>
      </main>
    </>
  );
}

export const VerifyCertificatePage = VerifyCertificate;
export default VerifyCertificatePage;
