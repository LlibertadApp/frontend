export const useActas = () => {
    const saveActas = (acta: FormData) => {
        const formDataObject = Object.fromEntries(acta.entries());
        const actasInStorage = sessionStorage.getItem('actas');
        const parsedActas = actasInStorage ? JSON.parse(actasInStorage) : [];
        parsedActas.push(formDataObject);
        sessionStorage.setItem('actas', JSON.stringify(parsedActas));
    };

    const getStoredActas = () => {
        const actasInStorage = sessionStorage.getItem('actas');
        const parsedActas = actasInStorage ? JSON.parse(actasInStorage) : [];
        return parsedActas;
    };

    return { saveActas, getStoredActas };
};
