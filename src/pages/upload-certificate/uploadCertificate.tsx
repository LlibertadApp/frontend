import { useEffect, useState } from 'react';

import ProgressIndicator from '#/components/progressIndicator';
import Navbar from '#/components/navbar';
import UploadImage from '#/components/uploadImage';
import { ProgressStepStatus } from '#/components/progressIndicator/types';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { useCertificate } from '#/context/CertificationContext';
import { paths } from '#/routes/paths';

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

  // TODO: Replace with context useState
  const { setCertificateImage } = useCertificate();

  return (
    <section className="items-center flex flex-col ">
      <Navbar routerLink={paths.home} />
      <div className="p-4 w-full max-w-[52.5rem] lg:px-0">
        <div className="container flex-column items-center m-auto">
          <div className="progressIndicator">
            <ProgressIndicator
              steps={[
                ProgressStepStatus.Active,
                ProgressStepStatus.Pending,
                ProgressStepStatus.Pending,
              ]}
            />
          </div>
          <div className="p-2 text-center my-[14px] mx-4 text-2xl font-black text-text-off lg:my-14 lg:p-1 lg:text-[2.5rem]">
            <p>Cargar imagen</p>
          </div>
          <p className="py-2 text-left text-gray-darker lg:py-0 lg:text-xl lg:leading-6">
            Usa la cámara para subir <b>el certificado del fiscal</b>, o cargala
            desde la galería.
          </p>
          <div className="flex flex-col text-start gap-3 ">
            <UploadImage onUpload={(url) => setCertificateImage(url)} />
          </div>
        </div>
        {/* Establece url al contexto */}
      </div>
    </section>
  );
};

export default UploadCertificate;
