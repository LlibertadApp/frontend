import React, { createContext, useContext, useState, ReactNode } from 'react';

// Crear un contexto para el certificado
const CertificateContext = createContext<{
  file?: File
  setFile: (file: File | undefined) => void

  certificateImage?: File
  setCertificateImage: (image: File | undefined) => void
  completedForm: boolean, setCompletedForm: (val: boolean) => void
} | undefined>(undefined);

export function CertificateProvider(
  { children }: { children: ReactNode }
) {
  const [file, setFile] = useState<File | undefined>();
  const [certificateImage, setCertificateImage] = useState<File | undefined>();
  const [completedForm, setCompletedForm] = useState(true)
  return (
    <CertificateContext.Provider value={{ file, setFile, certificateImage, setCertificateImage,completedForm, setCompletedForm }}>
      {children}
    </CertificateContext.Provider>
  );
}

export const useCertificate = () => {
  const context = useContext(CertificateContext);
  if (!context) {
    throw new Error('useCertificate must be used within a CertificateProvider');
  }
  return context;
};
