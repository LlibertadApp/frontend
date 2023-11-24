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

const UploadCertificate = () => {
  const navigate = useNavigate();

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
          Cargar imagen
        </h1>
        <p className="text-neutral-600 text-base">
          Usá la cámara para subir <b>el certificado del fiscal</b>, o cargala
          desde la galería.
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
              Buscá un lugar con buena luz.
            </span>
          </li>
          <li className="flex flex-row gap-[8px] text-left">
            <CheckCircle className="text-green" size={24} />
            <span className="text-neutral-600 text-sm flex-1">
              Asegurate de que se vean todos los datos.
            </span>
          </li>
          <li className="flex flex-row gap-[8px] text-left">
            <CheckCircle className="text-green" size={24} />
            <span className="text-neutral-600 text-sm flex-1">
              Asegurate que el certificado esté firmado por el presidente de tu
              mesa.
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
