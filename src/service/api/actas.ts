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

  // Removemos del storagedMesas aquellas mesas que ya vienen desde el backend
  // y agregamos el estado: 'PROCESANDO' a las mesas que NO vienen desde el backend
  if (data.data) {
    console.log('Data no es undefined');
    const parsedStoragedActas = storagedActas
      .filter((mesa) => !data.data.find((acta) => acta.id === mesa.id))
      .map((acta) => ({ ...acta, estado: 'PROCESANDO' })) as Acta[];

    // Clona uno de los objetos del array de actas que vienen desde el backend
    const anomaliaActa = JSON.parse(JSON.stringify(data.data[0]));
    anomaliaActa.estado = 'ANOMALIA';

    const okActa = JSON.parse(JSON.stringify(data.data[0]));
    okActa.estado = 'OK';

    actas.push(...parsedStoragedActas, anomaliaActa, okActa, ...data.data);
  }

  return actas as Acta[];
};
