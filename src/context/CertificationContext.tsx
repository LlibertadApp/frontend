import React, { createContext, useContext, useState, ReactNode } from 'react';


type CertificateImageType = string | null;


// Crear un contexto para el certificado
const CertificateContext = createContext<{
  certificateImage: CertificateImageType;
  setCertificateImage: (url: CertificateImageType) => void;
} | undefined>(undefined);



// Proveedor de contexto
export const CertificateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Estado que almacena la URL de la imagen del certificado (TEMPORAL)
  const [certificateImage, setCertificateImage] = useState<CertificateImageType>(null);

  return (
    <CertificateContext.Provider value={{ certificateImage, setCertificateImage }}>
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
