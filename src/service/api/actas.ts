export const saveActas = (acta: FormData) => {
  const formDataObject = Object.fromEntries(acta.entries());
  const actas = sessionStorage.getItem('actas');
  const parsedActas = actas ? JSON.parse(actas) : [];
  parsedActas.push(formDataObject);
  sessionStorage.setItem('actas', JSON.stringify(parsedActas));
};

export const getActas = () => {
  const actas = sessionStorage.getItem('actas');
  return actas ? JSON.parse(actas) : [];
};
