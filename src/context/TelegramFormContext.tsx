import { TelegramData } from '#/pages/load-information/types';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TelegramFormContextType {
  // Foto del telegrama
  telegramImage: string;
  setTelegramImage: (url: string) => void;

  // Datos del formulario del telegrama
  telegramForm: TelegramData;
  setTelegramForm: (telegramForm: TelegramData) => void;
}

// Creación del contexto para el formulario del telegrama
const TelegramFormContext = createContext<TelegramFormContextType | undefined>(undefined);

// Creación del provider del contexto
export function TelegramFormProvider({ children }: { children: ReactNode }) {
  // Estado que almacena la URL de la imagen del telegrama (TEMPORAL)
  const [telegramImage, setTelegramImage] = useState<string>('');

  // Estado que almacena los datos del formulario del telegrama
  const [telegramForm, setTelegramForm] = useState<TelegramData>({
    circuit: '',
    table: '',
    electors: 0,
    envelopes: 0,
    validVotesDifference: false,
    validTableInformation: false,

    votes: {
      lla: 0,
      uxp: 0,
      blank: 0,
      null: 0,
      disputed: 0,
      identity: 0,
      command: 0
    },
    
    validTotalVotes: false,
    formAgreement: false,
  });

  return (
    <TelegramFormContext.Provider value={{ telegramImage, setTelegramImage, telegramForm, setTelegramForm }}>
      {children}
    </TelegramFormContext.Provider>
  );
}

// Crear un hook personalizado para acceder al contexto
export const useTelegramForm = () => {
  const context = useContext(TelegramFormContext);
  if (!context) {
    throw new Error('useTelegramForm must be used within a TelegramFormProvider');
  }
  return context;
}
