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

  const { data } = await axios.get('v1/actas', {
    headers: { Authorization: token },
  });

  return data;
};
