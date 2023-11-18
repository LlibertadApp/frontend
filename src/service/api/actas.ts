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

  // Removemos del storagedMesas aquellas mesas que ya vienen desde el backend
  const parsedStoragedActas = storagedActas.filter(
    (mesa) => !data.data.find((acta) => acta.id === mesa.id),
  );

  const actas = [...parsedStoragedActas, ...data.data];
  console.log('actas', actas);

  return actas;
};
