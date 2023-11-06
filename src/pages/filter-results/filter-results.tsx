import { useState } from 'react';
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
} from "#/mocks/_mocks";
import { Trash, Faders, ArrowRight, ArrowLeft } from "@phosphor-icons/react";
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


  return (
    <>

      <main className="items-center flex flex-col relative px-4 pb-4 ">
        <section className="md:w-1/2 w-full rounded-xl z-10 items-end">

          <div className="flex flex-col gap-7 py-2 " id="filter-list">
            <Selector
              label="Distrito"
              onChange={setDistrito}
              options={districtsMock}
            />
            <Selector
              label="Sección Electoral"
              onChange={setSeccionElectoral}
              options={electoralSectionsMock}
            />
            <Selector
              label="Sección"
              onChange={setSeccion}
              options={sectionsMock}
            />
            <Selector
              label="Municipio"
              onChange={setMunicipio}
              options={municipalitiesMock}
            />
            <Selector
              label="Circuito"
              onChange={setCircuito}
              options={circuitsMock}
            />
            <Selector label="Mesa" onChange={setMesa} options={dummyData} />
          </div>



        </section>
      </main>
    </>
  );
};

export const Filter = observer(FilterPage);

export default Filter;
