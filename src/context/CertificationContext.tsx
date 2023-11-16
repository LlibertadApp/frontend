import React, { createContext, useContext, useState, ReactNode } from 'react';

// Crear un contexto para el certificado
const CertificateContext = createContext<
  | {
      file?: File;
      setFile: (file: File) => void;
      certificateImage?: File;
      setCertificateImage: (image: File) => void;
    }
  | undefined
>(undefined);

export const CertificateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [file, setFile] = useState<File | undefined>();
  const [certificateImage, setCertificateImage] = useState<File | undefined>();

  const storedPicture = localStorage.getItem('actualPicture');
  if (storedPicture) {
    fetch(storedPicture)
      .then((response) => response.blob())
      .then((blob) => {
        setFile(blob as File);
        setCertificateImage(blob as File);
      })
      .catch((error) => {
        console.error('Error loading picture from localStorage:', error);
      });
  }

  return (
    <CertificateContext.Provider
      value={{ file, setFile, certificateImage, setCertificateImage }}
    >
      {children}
    </CertificateContext.Provider>
  );
};

// Crear un hook personalizado para acceder al contexto
export const useCertificate = () => {
  const context = useContext(CertificateContext);
  if (!context) {
    throw new Error('useCertificate must be used within a CertificateProvider');
  }
  return context;
};
