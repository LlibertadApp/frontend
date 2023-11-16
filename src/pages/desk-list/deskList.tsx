import Button from '#/components/button';
import Navbar from '#/components/navbar';
import { paths } from '#/routes/paths';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { IAccordionExpanded, IDeskItemLabel, IDeskNormalStatus } from './types';
import { useActas } from '#/hooks/utils/useActas';
import { getUserActas } from '#service/api/actas';
import TableListItem from '#/components/tableListItem';

const DeskList: FC = () => {
  // getUserActas();
  // const { getStoredActas } = useActas();
  // const actas = getStoredActas();
  const [isLoading, setIsLoading] = useState(false);
  const [actas, setActas] = useState([]);

  const [accordionExpanded, setAccordionExpanded] =
    useState<IAccordionExpanded>({});

  useEffect(() => {
    getUserActas()
      .then((res) => {
        setActas(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange =
    (mesaId: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setAccordionExpanded({
        ...accordionExpanded,
        [mesaId]: isExpanded,
      });
    };

  return (
    <main>
      <Navbar routerLink={paths.home} showArrow={true} />
      <section className="flex p-4 justify-center">
        <div className="flex flex-col pt-8">
          {/* No hay datos, no hay mesas para mostrar */}
          <span className="text-violet-brand text-4xl font-black pt-4 start">
            MESAS CARGADAS
          </span>
          {!actas.length ? (
            <div>
              <div className="flex flex-col items-center pt-12">
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="100" height="100" rx="50" fill="#E1DCEC" />
                  <path
                    d="M72.3606 35.4946C72.1961 35.1865 71.9105 35 71.6036 35H58.1721C57.8251 35 57.5092 35.2379 57.3613 35.6108L55.0635 41.4019L53.4209 35.719C53.2965 35.289 52.9559 35 52.5731 35H28.3964C28.1069 35 27.835 35.1662 27.6668 35.446C27.4986 35.7257 27.4545 36.085 27.5486 36.4103L29.8598 44.4064V63.9352C29.8598 64.5231 30.2612 64.9999 30.7562 64.9999H68.3642V65C68.8593 65 69.2606 64.5233 69.2606 63.9353V44.4672L72.4145 36.5187C72.5453 36.1888 72.525 35.8024 72.3606 35.4946ZM29.6519 37.1294H51.933L53.6772 43.1642H31.3962L29.6519 37.1294ZM54.0364 62.8708H31.6526V45.2936H54.0364V62.8708ZM67.4678 62.8708H55.8292V45.2936H67.4678V62.8708ZM67.7957 43.1642H56.3462L58.7406 37.1294H70.1901L67.7957 43.1642Z"
                    fill="#714FB6"
                    stroke="#714FB6"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="py-8 text-2xl m-8 font-normal text-center">
                  Todavía no hay ninguna mesa cargada
                </p>
              </div>
            </div>
          ) : (
            <div className="md:flex md:flex-row md:items-start md:flex-wrap md:justify-around flex flex-col items-center py-8 gap-2">
              {actas.map((acta: any, index: number) => (
                <TableListItem acta={acta} key={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default DeskList;
