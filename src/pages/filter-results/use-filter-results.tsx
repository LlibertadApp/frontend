import { useSelectData } from "#/hooks/utils/use-select-data";
import { useCallback, useState } from "react";

export const useFilterResults = () => {
    const [distrito, setDistrito] = useState<string>('');
    const [seccionElectoral, setSeccionElectoral] = useState<string>('');
    const [seccion, setSeccion] = useState<string>('');
    const [municipio, setMunicipio] = useState<string>('');
    const [circuito, setCircuito] = useState<string>('');
    const [establecimiento, setEstablecimiento] = useState<string>('');
    const [mesa, setMesa] = useState<string>('');
  
    const {
      districts,
      electoralSections,
      sections,
      municipalities,
      circuits,
      establishments,
      tables,
    } = useSelectData();
  
    const clearFilters = useCallback(() => {
      setDistrito('');
      setSeccionElectoral('');
      setSeccion('');
      setMunicipio('');
      setCircuito('');
      setEstablecimiento('');
      setMesa('');
    }, []);

    return {
        distrito,
        setDistrito,
        seccionElectoral,
        setSeccionElectoral,
        seccion,
        setSeccion,
        municipio,
        setMunicipio,
        circuito,
        setCircuito,
        establecimiento,
        setEstablecimiento,
        mesa,
        setMesa,
        districts,
        electoralSections,
        sections,
        municipalities,
        circuits,
        establishments,
        tables,
        clearFilters
    };
};
