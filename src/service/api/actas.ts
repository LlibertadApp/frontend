import Acta from '#/interfaces/acta.interface';
import axios from '#utils/axiosAdapter';

export const saveActas = (acta: FormData) => {
  const formDataObject = Object.fromEntries(acta.entries());
  const actas = sessionStorage.getItem('actas');
  const parsedActas = actas ? JSON.parse(actas) : [];
  parsedActas.push(formDataObject);
  sessionStorage.setItem('actas', JSON.stringify(parsedActas));
};

export const getUserActas = async () => {
  const token = sessionStorage.getItem('token');
  const storagedActas = JSON.parse(
    sessionStorage.getItem('actas') || '[]',
  ) as Acta[];

  const { data } = await axios.get<{ data: Acta[] }>('v1/actas', {
    headers: { Authorization: token },
  });

  const actas: Acta[] = [];
  actas.push(
    ...storagedActas.map((acta) => ({ ...acta, estado: 'PROCESANDO' }) as Acta),
  );

  if (data.data) {
    // Si existen datos en la API, removemos aquellas mesas que ya vienen desde el backend
    actas.filter((acta) => !data.data.find((acta) => acta.id === acta.id));

    // Ingresamos en actas las mesas que vienen desde el backend
    actas.push(...data.data);
  }

  return actas as Acta[];
};
