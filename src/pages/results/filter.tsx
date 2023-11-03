import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Selector } from '#/components/selector';
import Button from '#/components/button';
import Navbar from '#/components/navbar';
import { paths } from '#/routes/paths';

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
      <main className="items-center flex flex-col relative px-10">
        <section className="md:w-1/2 w-full rounded-xl z-10 mt-10">
          <h1 className="text-xl font-bold mb-6">Resultados totales</h1>
          <div className="px-3 flex flex-col gap-4" id="filter-list">
            <Selector
              label="Distrito"
              onChange={setDistrito}
              options={dummyData}
            />
            <Selector
              label="Sección Electoral"
              onChange={setSeccionElectoral}
              options={dummyData}
            />
            <Selector
              label="Sección"
              onChange={setSeccion}
              options={dummyData}
            />
            <Selector
              label="Municipio"
              onChange={setMunicipio}
              options={dummyData}
            />
            <Selector
              label="Circuito"
              onChange={setCircuito}
              options={dummyData}
            />
            <Selector
              label="Establecimiento"
              onChange={setEstablecimiento}
              options={dummyData}
            />
            <Selector label="Mesa" onChange={setMesa} options={dummyData} />
          </div>

          <Button
            className="mt-10 bg-violet-brand p-4 text-white w-full rounded-xl font-semibold text-xl tracking-wider"
            type="submit"
            label="Aplicar Filtros"
          />
          <Button
            className="border-2 border-red text-red bg-transparent p-3 w-full rounded-xl text-xl tracking-wider shadow-md hover:border-violet-light mt-3"
            type="submit"
            label="Alertar Irregularidades"
          />
        </section>
      </main>
    </>
  );
};

export const Filter = observer(FilterPage);

export default Filter;
