export interface DummyDataItem {
    name: string;
    lastname: string;
    email: string;
    dni: string;
    phone: string;
    state: 'active' | 'inactive'; // Cambiado de string a los tipos literales específicos.
  }