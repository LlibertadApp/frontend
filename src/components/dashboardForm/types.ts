export interface FormValues {
  name: string;
  province: string;
  locality: string;
  school: string;
  email: string;
  phone: string;
  dni: string;
}

// Definición de la interfaz para los campos del formulario
export interface FormField {
  name: keyof FormValues;
  label: string;
  type: string;
}