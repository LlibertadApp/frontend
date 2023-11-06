import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { X, ArrowRight } from '@phosphor-icons/react';

import { FilterPage } from '#/pages/filter-results/filterResults';
import { Filter, useFilter } from '#/context/FilterContext';
import { ButtonFilter } from '#/components/buttonFilter';
import { ButtonClearFilter } from '#/components/buttonClearFilter';
import { ListFilters } from '#/components/listFilters';
import Navbar from '#/components/navbar';
import Button from '#/components/button';
import { paths } from '#/routes/paths';

const customFilters: Filter[] = [
  {
    id: '1',
    name: 'distrito',
    value: 'Buenos Aires',
  },
  {
    id: '2',
    name: 'seccion_electoral',
    value: 'Sección Tercera',
  },
  {
    id: '3',
    name: 'seccion',
    value: 'Lanus',
  },
  {
    id: '4',
    name: 'municipio',
    value: '771D',
  },
  {
    id: '5',
    name: 'municipio',
    value: '00669/9',
  },
];

const TotalResultsPage = () => {
  const { filters, clearFilters, setFilters } = useFilter();
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  useEffect(() => {
    setFilters(customFilters);
  }, []);

  const percentages = [61.05, 38.95];
  const votes = ['16,482,688', '10,517,312'];
  return (
    <div className="bg-white h-screen flex flex-col">
      <Navbar routerLink={paths.home} />

      <div className="flex flex-col p-4">
        <p className="font-bold text-[32px] text-violet-primary mt-[16px]">
          BALOTAJE
        </p>

        {/* Sección de botones */}
        <section className="flex flex-1 flex-row gap-5 mb-4">
          {filters.length > 0 && (
            <ButtonClearFilter
              amountOfFilters={filters.length}
              clearFilters={clearFilters}
            />
          )}
          <button onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}>
            <ButtonFilter amount={filters.length} />
          </button>
        </section>

        <div>
          <ListFilters filters={filters} />
        </div>

        {/* Menú de filtros (desplegable) */}
        {isFilterMenuOpen && (
          <div
            className={`fixed bottom-0 left-0 right-0 mx-auto my-auto bg-white p-2 rounded-3xl shadow-md border-t border-gray-300 z-10 transition-all duration-300 backdrop-filter  ${
              isFilterMenuOpen ? 'max-h-[82%]' : 'h-0'
            } overflow-y-auto`}
          >
            <div className="flex flex-row gap-2 justify-between items-center px-4 py-4">
              <p className="font-bold text-[20px] text-violet-brand pt-2">
                Filtros
              </p>
              <div
                className="p-4 flex justify-end"
                onClick={() => setIsFilterMenuOpen(false)}
              >
                <X size={24} />
              </div>
            </div>

            <FilterPage />

            <div className="flex flex-1 flex-row gap-4 mt-2 items-center pb-14 p-4">
              <div className="w-1/2">
                <div className="flex h-full items-center justify-center">
                  <ButtonClearFilter
                    clearFilters={() => {}}
                    amountOfFilters={1}
                  />
                </div>
              </div>

              <div className="w-1/2">
                <button className="flex flex-row justify-center gap-4 bg-violet-brand text-white p-4 w-full rounded-xl tracking-wider hover:border-violet-light hover:bg-violet-dark">
                  <span className="flex items-center">
                    Aplicar
                    <ArrowRight size={22} style={{ marginLeft: '18px' }} />
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="lg:px-60 px-3 flex flex-col gap-6">
        {
          //Card Javier, VLL
        }
        <div className="flex flex-col border rounded-2xl">
          <div className="flex flex-col">
            <div className="flex flex-row pl-4 pt-4 pr-4 pb-2 justify-between">
              <img src="assets/logos/fenix.png" className="w-16 h-14" alt="" />
              <div className="flex flex-col items-end">
                <span className={`text-[12px] text-gray-dark`}>
                  {votes[0]} votos
                </span>
                <p className={`font-bold uppercase text-violet-primary`}>
                  {percentages[0]}%
                </p>
              </div>
            </div>
            <div className="grid grid-rows-3 pb-4 pr-4 pl-4 pt-2 grid-cols-1 items-center">
              <div className="rounded-md h-2 bg-gray-light">
                <div
                  className={`h-full bg-violet-primary rounded-l`}
                  style={{ width: `${percentages[0]}%` }}
                ></div>
              </div>
              <p
                className={`text-[13px] font-bold uppercase text-violet-primary flex items-start`}
              >
                LA LIBERTAD AVANZA
              </p>
              <p
                className={`text-[12px] text-start uppercase text-gray-dark flex items-start`}
              >
                JAVIER MILEI - VICTORIA VILLARRUEL
              </p>
            </div>
          </div>
        </div>
        {
          //Card Massa, que asco
        }
        <div className="flex flex-col border rounded-2xl">
          <div className="flex flex-col">
            <div className="flex flex-row pl-4 pt-4 pr-4 pb-2 justify-between">
              <img src="assets/logos/uxp.svg" className="w-16 h-14" alt="" />
              <div className="flex flex-col items-end">
                <span className={`text-[12px] text-gray-dark`}>
                  {votes[1]} votos
                </span>
                <p className={`font-bold uppercase text-uxp`}>
                  {percentages[1]}%
                </p>
              </div>
            </div>
            <div className="grid grid-rows-3 pb-4 pr-4 pl-4 pt-2 grid-cols-1 items-center">
              <div className="rounded-md h-2 bg-gray-light">
                <div
                  className={`h-full bg-uxp rounded-l`}
                  style={{ width: `${percentages[1]}%` }}
                ></div>
              </div>
              <p
                className={`text-[13px] font-bold uppercase text-uxp flex items-start`}
              >
                UNIÓN POR LA PATRIA
              </p>
              <p
                className={`text-[12px] text-start uppercase text-gray-dark flex items-start`}
              >
                SERGIO TOMÁS MASSA - AGUSTÍN ROSSI
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="border border-t-1 border-gray-dark mt-10"></div>
      <div className="flex flex-col px-4 py-5 lg:px-60 gap-10 leading-5">
        <div className="flex flex-col">
          <span className="text-sm text-gray-dark">Total de votos</span>
          <span className="text-[22px] font-bold text-text-off">
            27,000,000
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-dark">Mesas escrutadas</span>
          <span className="text-[22px] font-bold text-text-off">90.00%</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-dark">Participación</span>
          <span className="text-[22px] font-bold text-text-off">76.36%</span>
        </div>
      </div>

      <div className="mt-4 p-4 hidden">
        <Button
          className="border-2 border-rose-700 text-rose-700 bg-transparent p-3 w-full rounded-xl text-xl tracking-wider shadow-md hover:border-rose-300 hover:text-rose-300 my-4"
          type="button"
          label="Alerta Irregularidades"
        />
      </div>
    </div>
  );
};

export const TotalResults = observer(TotalResultsPage);
export default TotalResults;
