import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from '@phosphor-icons/react';
import ProgressIndicator from '#/components/progressIndicator';
import Navbar from '#/components/navbar';
import { ProgressStepStatus } from '#/components/progressIndicator/types';
import { useCertificate } from '#/context/CertificationContext';
import { paths } from '#/routes/paths';
import UploadInput from '#/components/uploadInput';

const CheckItem = ({ text }: { text: string }) => (
  <div className="flex justify-space-around items-center md:text-xl text-sm gap-2 h-12">
    <div className="flex justify-center items-center rounded-full bg-green-check text-white w-5 h-5 flex-shrink-0">
      <img className="w-3 h-3" src="assets/icon/check-icon.svg" alt="" />
    </div>
    <p>{text}</p>
  </div>
);

const UploadCertificate = () => {
  const navigate = useNavigate();
  const { setFile, setCertificateImage } = useCertificate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    setFile(e.target.files?.[0]!);
    setCertificateImage(e.target.files?.[0]!);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileDataUrl = e.target?.result as string;
        localStorage.setItem('actualPicture', fileDataUrl);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Verificar y navegar solo si actualPicture existe y tiene información
  useEffect(() => {
    const actualPicture = localStorage.getItem('actualPicture');
    if (actualPicture) {
      navigate(paths.verifyCertificate);
    }
  }, []);

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
