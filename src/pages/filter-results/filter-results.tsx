import { useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Selector } from '#/components/selector';
import Button from '#/components/button';
import Navbar from '#/components/navbar';
import { paths } from '#/routes/paths';
import { X } from '@phosphor-icons/react'
import { Link } from 'react-router-dom';
import {
  districtsMock,
  electoralSectionsMock,
  sectionsMock,
  municipalitiesMock,
  establishmentsMock,
  circuitsMock,
  tables,
} from '#/mocks/_mocks';
import { Trash, Faders, ArrowRight , ArrowLeft } from '@phosphor-icons/react';
import { ButtonClearFilter } from '#/components';

const dummyData = [
  { key: 'ex1', label: 'Example' },
  { key: 'ex2', label: 'Example 2' },
  { key: 'ex3', label: 'Example 3' },
];



export const FilterPage = () => {
  const [distrito, setDistrito] = useState<string>('');
  const [seccionElectoral, setSeccionElectoral] = useState<string>('');
  const [seccion, setSeccion] = useState<string>('');
  const [municipio, setMunicipio] = useState<string>('');
  const [circuito, setCircuito] = useState<string>('');
  const [establecimiento, setEstablecimiento] = useState<string>('');
  const [mesa, setMesa] = useState<string>('');

  const clearFilters = useCallback(() => {
    setDistrito('');
    setSeccionElectoral('');
    setSeccion('');
    setMunicipio('');
    setCircuito('');
    setEstablecimiento('');
    setMesa('');
  }, []);

  return (
    <>

      <main className="items-center flex flex-col relative px-4 pb-4 ">
        <section className="md:w-1/2 w-full rounded-xl z-10 items-end">

          <div className="flex flex-col gap-7 py-2 " id="filter-list">
            <Selector
              label="Distrito"
              onChange={(e) => setDistrito(e.target.value)}
              options={districtsMock}
              value={distrito}
            />
            <Selector
              label="Sección Electoral"
              onChange={(e) => setSeccionElectoral(e.target.value)}
              options={electoralSectionsMock}
              value={seccionElectoral}
            />
            <Selector
              label="Sección"
              onChange={(e) => setSeccion(e.target.value)}
              options={sectionsMock}
              value={seccion}
            />
            <Selector
              label="Municipio"
              onChange={(e) => setMunicipio(e.target.value)}
              options={municipalitiesMock}
              value={municipio}
            />
            <Selector
              label="Circuito"
              onChange={(e) => setCircuito(e.target.value)}
              options={circuitsMock}
              value={circuito}
            />
            <Selector
              label="Establecimiento"
              onChange={(e) => setEstablecimiento(e.target.value)}
              options={establishmentsMock}
              value={establecimiento}
            />
            <Selector
              label="Mesa"
              onChange={(e) => setMesa(e.target.value)}
              options={dummyData}
              value={mesa}
            />
          </div>
          <div className="flex flex-1 flex-row gap-5 mt-[50px]">
            <Button
              appearance="outlined"
              type="submit"
              label="Limpiar"
              onClick={clearFilters}
            >
              Limpiar <Trash size={20} />
            </Button>
            <Button appearance="filled" type="submit" label="Aplicar">
              Aplicar <ArrowRight size={20} />
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export const Filter = observer(FilterPage);

export default Filter;
