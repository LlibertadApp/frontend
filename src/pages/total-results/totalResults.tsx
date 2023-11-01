import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import Navbar from '#/components/navbar';
import Button from '#/components/button';

const TotalResultsPage = () => {
  const percentages = [61.05, 38.95];
  const votes = ['16,482,688', '10,517,312'];
  return (
    <div className="bg-white h-screen flex flex-col">
      <Navbar routerLink="/home" />
      <div className="flex flex-col p-4">
        <p className="font-bold text-2xl text-gray-700 mt-5">
          Resultados totales
        </p>
        <Link
          to="/filter-results"
          className="border-2 border-violet-brand text-violet-brand bg-transparent p-3 w-full rounded-xl text-xl tracking-wider shadow-md hover:border-violet-light my-4"
        >
          Seleccionar filtros
        </Link>
      </div>
      <div className="lg:px-60 px-3 flex flex-col gap-6">
        {
          //Card Javier, VLL
        }
        <div className="flex flex-col border rounded-2xl">
          <div className="flex flex-col">
            <div className="flex flex-row pl-4 pt-4 pr-4 pb-2 justify-between">
              <img
                src="src/assets/logos/fenix.png"
                className="w-16 h-14"
                alt=""
              />
              <div className="flex flex-col items-end">
                <span className={`text-[12px] text-gray-dark`}>
                  {votes[0]} votos
                </span>
                <p className={`font-bold uppercase text-violet-brand`}>
                  {percentages[0]}%
                </p>
              </div>
            </div>
            <div className='grid grid-rows-3 pb-4 pr-4 pl-4 pt-2 grid-cols-1 items-center'>
              <div className="rounded-md h-2 bg-gray-light">
                <div
                  className={`h-full bg-violet-brand rounded-l`}
                  style={{ width: `${percentages[0]}%` }}
                ></div>
              </div>
              <p className={`text-[13px] font-bold uppercase text-violet-brand flex items-start`}>
                LA LIBERTAD AVANZA
              </p>
              <p className={`text-[12px] text-start uppercase text-gray-dark flex items-start`}>
                JAVIER MILEI - VICTORIA VILLARRUEL
              </p>
            </div>
          </div>
        </div>
        {
          //Card Massa, que asco
        }
        <div className="flex flex-col border rounded-2xl">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row pl-4 pt-4 pr-4 pb-2 justify-between">
              <img
                src="src/assets/logos/uxp.svg"
                className="w-16 h-14"
                alt=""
              />
              <div className="flex flex-col items-end">
                <span className={`text-[12px] text-gray-dark`}>
                  {votes[1]} votos
                </span>
                <p className={`font-bold uppercase text-uxp`}>
                  {percentages[1]}%
                </p>
              </div>
            </div>
            <div className='grid grid-rows-3 pb-4 pr-4 pl-4 pt-2 grid-cols-1 items-center'>
              <div className="rounded-md h-2 bg-gray-light">
                <div
                  className={`h-full bg-uxp rounded-l`}
                  style={{ width: `${percentages[1]}%` }}
                ></div>
              </div>
              <p className={`text-[13px] font-bold uppercase text-uxp flex items-start`}>
                UNIÓN POR LA PATRIA
              </p>
              <p className={`text-[12px] text-start uppercase text-gray-dark flex items-start`}>
                SERGIO TOMÁS MASSA - AGUSTÍN ROSSI
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-8 lg:px-60 mt-10">
        <div className="border border-t-1 opacity-70"></div>
        <div className="my-2">
          <span className="text-[17px] text-[#64748B]">Total de votos</span>
          <p className="text-[25px] font-bold uppercase text-[#61439D]">
            27,000,000
          </p>
        </div>
        <div className="border border-t-1 opacity-70"></div>
        <div className="flex flex-row justify-between mt-2 px-3">
          <div className="flex flex-col">
            <span className="text-[17px] text-[#64748B]">Mesas escrutadas</span>
            <p className="text-[25px] font-bold uppercase text-[#61439D]">
              90.00%
            </p>
          </div>
          <div className="flex flex-col">
            <span className="text-[17px] text-[#64748B]">Participación</span>
            <p className="text-[25px] font-bold uppercase text-[#61439D]">
              76.36%
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 p-4 hidden">
        <Button
          className="border-2 border-rose-700 text-rose-700 bg-transparent p-3 w-full rounded-xl text-xl tracking-wider shadow-md hover:border-violet-light my-4"
          type="button"
          label="Alerta Irregularidades"
        />
      </div>
    </div>
  );
};

export const TotalResults = observer(TotalResultsPage);
export default TotalResults;
