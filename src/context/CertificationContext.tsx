import React, { createContext, useContext, useState, ReactNode } from 'react';


type CertificateImageType = string | null;


// Crear un contexto para el certificado
const CertificadoContext = createContext<{
  certificateImage: CertificateImageType;
  setCertificateImage: (url: CertificateImageType) => void;
} | undefined>(undefined);



// Proveedor de contexto
export const CertificadoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Estado que almacena la URL de la imagen del certificado (TEMPORAL)
  const [certificateImage, setCertificateImage] = useState<CertificateImageType>(null);

  return (
    <CertificadoContext.Provider value={{ certificateImage, setCertificateImage }}>
      {children}
    </CertificadoContext.Provider>
  );
};

// Crear un hook personalizado para acceder al contexto
export const useCertificado = () => {
  const context = useContext(CertificadoContext);
  if (!context) {
    throw new Error('useCertificado must be used within a CertificadoProvider');
  }
  return context;
};
