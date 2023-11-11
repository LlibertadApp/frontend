import React, { createContext, useContext, useState, ReactNode } from 'react';

// Crear un contexto para el certificado
const CertificateContext = createContext<{
  file?: File
  setFile: (file: File) => void

  certificateImage?: string
  setCertificateImage: (image: string) => void
} | undefined>(undefined);

export function CertificateProvider(
  { children }: { children: ReactNode }
) {
  const [file, setFile] = useState<File>();
  const [certificateImage, setCertificateImage] = useState<string>();

  return (
    <CertificateContext.Provider value={{ file, setFile, certificateImage, setCertificateImage }}>
      {children}
    </CertificateContext.Provider>
  );
}

// Crear un hook personalizado para acceder al contexto
export const useCertificate = () => {
  const context = useContext(CertificateContext);
  if (!context) {
    throw new Error('useCertificate must be used within a CertificateProvider');
  }
  return context;
};
