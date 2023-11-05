import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Selector } from '#/components/selector';
import Button from '#/components/button';
import Navbar from '#/components/navbar';
import { paths } from '#/routes/paths';
import {
  districtsMock,
  electoralSectionsMock,
  sectionsMock,
  municipalitiesMock,
  establishmentsMock,
  circuitsMock,
  tables,
} from "#/mocks/_mocks";

const dummyData = [
  { key: 'ex1', label: 'Example' },
  { key: 'ex2', label: 'Example 2' },
  { key: 'ex3', label: 'Example 3' },
];

const FilterPage = () => {
  const [distrito, setDistrito] = useState<string>('');
  const [seccionElectoral, setSeccionElectoral] = useState<string>('');
  const [seccion, setSeccion] = useState<string>('');
  const [municipio, setMunicipio] = useState<string>('');
  const [circuito, setCircuito] = useState<string>('');
  const [establecimiento, setEstablecimiento] = useState<string>('');
  const [mesa, setMesa] = useState<string>('');

  return (
    <>
      <Navbar routerLink={paths.totalResults} />
      <main className="items-center flex flex-col relative px-4 pb-4">
        <section className="md:w-1/2 w-full rounded-xl z-10">
          <p className="font-bold text-[32px] text-violet-brand mt-5 mb-[22px]">
            FILTROS
          </p>
          <div className="flex flex-col gap-7 py-3" id="filter-list">
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
            <Selector
              label="Establecimiento"
              onChange={setEstablecimiento}
              options={establishmentsMock}
            />
            <Selector label="Mesa" onChange={setMesa} options={dummyData} />
          </div>
          <div className="flex flex-1 flex-row gap-5 mt-[50px]">
            <div className="flex flex-row gap-[10px] justify-center items-center py-[18px] text-violet-primary border-2 border-violet-primary w-full rounded-xl font-medium">
              <Button
                className="text-xl tracking-wide"
                type="submit"
                label="Limpiar"
              />
              <img src="assets/icon/trash.svg" alt="trash" />
            </div>

            <div className="flex flex-row gap-[10px] justify-center items-center py-[18px] bg-violet-primary text-white w-full rounded-xl ">
              <Button
                className="text-xl tracking-wide"
                type="submit"
                label="Aplicar"
              />
              <img src="assets/icon/arrow-apply.svg" alt="sliders" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export const Filter = observer(FilterPage);

export default Filter;
