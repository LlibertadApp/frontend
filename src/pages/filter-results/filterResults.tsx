import { useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Trash, ArrowRight } from '@phosphor-icons/react';
import { Selector } from '#/components/selector';
import Button from '#/components/button';
import Navbar from '#/components/navbar';
import { paths } from '#/routes/paths';
import { useSelectData } from '#/hooks/utils/use-select-data';
import { useFilterResults } from './use-filter-results';

export const FilterPage = () => {
  const {
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
    clearFilters,
  } = useFilterResults();

  return (
    <>
      <Navbar routerLink={paths.totalResults} />
      <main className="items-center flex flex-col relative px-4 pb-4 ">
        <section className="md:w-1/2 w-full rounded-xl z-10 items-end">
          <p className="font-bold text-[32px] text-violet-brand mt-5 mb-[22px]">
            FILTROS
          </p>
          <div className="flex flex-col gap-7 py-2 " id="filter-list">
            <Selector
              label="Distrito"
              onChange={(e) => setDistrito(e.target.value)}
              options={districts}
              value={distrito}
            />
            <Selector
              label="Sección Electoral"
              onChange={(e) => setSeccionElectoral(e.target.value)}
              options={electoralSections}
              value={seccionElectoral}
            />
            <Selector
              label="Sección"
              onChange={(e) => setSeccion(e.target.value)}
              options={sections}
              value={seccion}
            />
            <Selector
              label="Municipio"
              onChange={(e) => setMunicipio(e.target.value)}
              options={municipalities}
              value={municipio}
            />
            <Selector
              label="Circuito"
              onChange={(e) => setCircuito(e.target.value)}
              options={circuits}
              value={circuito}
            />
            <Selector
              label="Establecimiento"
              onChange={(e) => setEstablecimiento(e.target.value)}
              options={establishments}
              value={establecimiento}
            />
            <Selector
              label="Mesa"
              onChange={(e) => setMesa(e.target.value)}
              options={tables}
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
