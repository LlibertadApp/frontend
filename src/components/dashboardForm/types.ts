export interface FormValues {
  name: string;
  province: string;
  locality: string;
  school: string;
  email: string;
  phone: string;
  dni: string;
}

export interface BaseField {
  name: string;
  label: string;
}

export interface TextField extends BaseField {
  type: 'text' | 'email' | 'number';
}

export interface SelectField extends BaseField {
  type: 'select';
  options: Array<{ element: string; label: string }>;
}

export type FormField = TextField | SelectField;

// CustomFieldProps ahora usa el tipo FormField
export interface CustomFieldProps {
  field: FormField;
}