import React, { createContext, useContext, useState, ReactNode } from 'react';

// type CertificateImageType = string | null;
type CertificateImageType = File | null | undefined;
type CertificateImageBase64Type = string |null;

// Crear un contexto para el certificado
const CertificateContext = createContext<{
  certificateImage: CertificateImageType;
  certificateImageBase64: CertificateImageBase64Type;
  setCertificateImage: (file: CertificateImageType) => void;
  setCertificateImageBase64: (base64: CertificateImageBase64Type) => void;
} | undefined>(undefined);



// Proveedor de contexto
export const CertificateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Estado que almacena la URL de la imagen del certificado (TEMPORAL)
  const [certificateImage, setCertificateImage] = useState<CertificateImageType>(null);
  const [certificateImageBase64, setCertificateImageBase64] = useState<CertificateImageBase64Type>(null);

  return (
    <CertificateContext.Provider value={{ certificateImage, setCertificateImage, certificateImageBase64, setCertificateImageBase64 }}>
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
