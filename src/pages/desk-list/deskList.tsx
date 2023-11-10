import Button from '#/components/button';
import Navbar from '#/components/navbar';
import { paths } from '#/routes/paths';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import { FC, useState } from 'react';
import { IDeskItemLabel, IDeskNormalStatus } from './types';

const DeskItemLabel: FC<IDeskItemLabel> = ({
  typoProps = {
    color: 'black',
    align: 'left',
    fontFamily: 'Poppins',
    flexDirection: 'row',
    fontSize: '14px',
  },
  className,
  deskValue,
  label,
  statusStyle,
}) => {
  return (
    <Typography {...typoProps} className={className}>
      <span className="flex flex-row py-2 text-m px-2">
        {label}:{' '}
        <span className="text-gray-400 px-2" style={statusStyle}>
          {deskValue}
        </span>
      </span>
    </Typography>
  );
};

const EllipseIcon: FC<IDeskNormalStatus> = ({ deskNormalStatus }) => {
  const fillColor = deskNormalStatus ? '#EEF9F5' : '#FDEFEF';
  const fillStrokeColor = deskNormalStatus ? '#58C299' : '#E13C3C';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
    >
      <circle
        cx="8"
        cy="8.5"
        r="7.5"
        fill={fillColor}
        stroke={fillStrokeColor}
      />
    </svg>
  );
};

const DropIcon: FC = () => {
  return (
    <svg
      width="13"
      height="8"
      viewBox="0 0 13 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.021 1.80235L6.86479 6.9586C6.8169 7.00654 6.76003 7.04457 6.69743 7.07052C6.63484 7.09647 6.56774 7.10982 6.49998 7.10982C6.43222 7.10982 6.36512 7.09647 6.30253 7.07052C6.23993 7.04457 6.18306 7.00654 6.13518 6.9586L0.978927 1.80235C0.882175 1.7056 0.82782 1.57437 0.82782 1.43754C0.82782 1.30071 0.882175 1.16949 0.978927 1.07274C1.07568 0.975985 1.2069 0.921631 1.34373 0.921631C1.48056 0.921631 1.61178 0.975985 1.70854 1.07274L6.49998 5.86483L11.2914 1.07274C11.3393 1.02483 11.3962 0.986829 11.4588 0.960902C11.5214 0.934975 11.5885 0.921631 11.6562 0.921631C11.724 0.921631 11.7911 0.934975 11.8537 0.960902C11.9163 0.986829 11.9731 1.02483 12.021 1.07274C12.0689 1.12064 12.1069 1.17752 12.1329 1.24011C12.1588 1.3027 12.1721 1.36979 12.1721 1.43754C12.1721 1.50529 12.1588 1.57238 12.1329 1.63497C12.1069 1.69757 12.0689 1.75444 12.021 1.80235Z"
        fill="#1D1A28"
      />
    </svg>
  );
};

const DeskStatusIcon: FC<IDeskNormalStatus> = ({ deskNormalStatus }) => {
  const normalIcon = '/assets/icon/checkcircle.svg';

  const irregularIcon = '/assets/icon/xcircle.svg';

  return deskNormalStatus ? (
    <img src={normalIcon} alt="Icono Check" loading="lazy" />
  ) : (
    <img src={irregularIcon} alt="Icono X" loading="lazy" />
  );
};

const DeskStatus: FC<IDeskNormalStatus> = ({ deskNormalStatus }) => {
  return (
    <div className="flex gap-2 mb-6 items-center">
      <p>Status de la mesa:</p>
      <div
        className={`${
          deskNormalStatus
            ? 'border-green-light bg-[#EEF9F5]'
            : 'border-red-error bg-[#FDEFEF]'
        } flex gap-2 p-2 border rounded-lg `}
      >
        <DeskStatusIcon deskNormalStatus={deskNormalStatus} />
        <p className={deskNormalStatus ? 'text-green-light' : 'text-red-error'}>
          {deskNormalStatus ? 'Normal' : 'Irregular'}
        </p>
      </div>
    </div>
  );
};

const DeskList: FC = () => {
  const DummyData = {
    desks: [
      {
        id: 1,
        deskNumber: '484',
        description: '',
        status: {
          normal: true,
        },
        votes: 40,
        envelopes: '240',
        circuit: '635',
        electors: '240',
        candidate1: {
          name: 'Javier Gerardo Milei',
          votes: '190',
        },
        candidate2: {
          name: 'Sergio Tomás Massa',
          votes: '315',
        },
        nullVotes: '0',
        recurredVotes: '0',
        impugnedVotes: '0',
        commandVotes: '0',
        blankVotes: '0',
        totalVotes: '240',
      },

      {
        id: 2,
        deskNumber: '777',
        description: '',
        status: {
          normal: false,
        },
        votes: 40,
        envelopes: '240',
        circuit: '635',
        electors: '240',
        candidate1: {
          name: 'Javier Gerardo Milei',
          votes: '190',
        },
        candidate2: {
          name: 'Sergio Tomás Massa',
          votes: '315',
        },
        nullVotes: '0',
        recurredVotes: '0',
        impugnedVotes: '0',
        commandVotes: '0',
        blankVotes: '0',
        totalVotes: '240',
      },
    ],
  };

  const [accordionExpanded, setAccordionExpanded] = useState({} as any);

  const handleChange =
    (deskNumber: string) => (event: any, isExpanded: boolean) => {
      setAccordionExpanded({
        ...accordionExpanded,
        [deskNumber]: isExpanded,
      });
    };

  return (
    <main>
      <Navbar routerLink={paths.home} showArrow={true} />
      <section className="flex p-4 justify-center">
        <div className="pt-8">
          {/* No hay datos, no hay mesas para mostrar */}
          <span className="text-violet-brand text-4xl font-black pt-4 start">
            MESAS CARGADAS
          </span>
          {DummyData.desks.length === 1 ? (
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
                    stroke-linejoin="round"
                  />
                </svg>
                <p className="py-8 text-2xl m-8 font-normal">
                  Todavía no hay ninguna mesa cargada
                </p>
              </div>
            </div>
          ) : (
            <div className="py-8">
              {DummyData.desks.map((desk) => (
                <Accordion
                  key={desk.id}
                  style={{
                    border: '1px solid #E3E3E9',
                    marginBottom: '1rem',
                    borderRadius: '8px',
                    boxShadow: '0px 10px 10px 0px rgba(0, 0, 0, 0.05)',
                  }}
                  sx={{
                    boxShadow: 'none',
                    '&:before': {
                      display: 'none',
                    },
                  }}
                  expanded={accordionExpanded[desk.deskNumber] || false}
                  onChange={handleChange(desk.deskNumber)}
                >
                  <AccordionSummary
                    expandIcon={<DropIcon />}
                    className="pb-4"
                    classes={{ content: 'items-center gap-2' }}
                  >
                    {!accordionExpanded[desk.deskNumber] && (
                      <EllipseIcon deskNormalStatus={desk.status.normal} />
                    )}
                    <div className="flex flex-col">
                      <Typography
                        color="#363745"
                        align="left"
                        fontFamily={'Poppins'}
                        fontSize="18px"
                      >
                        <strong>Mesa</strong> {desk.deskNumber}
                      </Typography>
                      {!accordionExpanded[desk.deskNumber] && (
                        <Typography
                          color="#908DA8"
                          align="left"
                          fontFamily={'Poppins'}
                          fontSize="12px"
                        >
                          {desk.electors} electores
                        </Typography>
                      )}
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <DeskStatus deskNormalStatus={desk.status.normal} />
                    <DeskItemLabel
                      className="bg-gray-100 rounded-md"
                      deskValue={desk.circuit}
                      label="Circuito"
                    />
                    <DeskItemLabel
                      deskValue={desk.electors}
                      label="Nro. de electores"
                      statusStyle={{
                        color: !desk.status.normal ? '#E13C3C' : '',
                      }}
                    />
                    <DeskItemLabel
                      className="bg-gray-100 rounded-md"
                      deskValue={desk.envelopes}
                      label="Nro. de sobres"
                      statusStyle={{
                        color: !desk.status.normal ? '#E13C3C' : '',
                      }}
                    />
                    <hr className="border-t-gray-dark my-2 " />
                    <DeskItemLabel
                      deskValue={desk.candidate1.votes}
                      label={desk.candidate1.name}
                    />
                    <DeskItemLabel
                      className="bg-gray-100 rounded-md"
                      deskValue={desk.candidate2.votes}
                      label={desk.candidate2.name}
                    />
                    <DeskItemLabel
                      deskValue={desk.nullVotes}
                      label="Votos nulos"
                    />
                    <DeskItemLabel
                      className="bg-gray-100 rounded-md"
                      deskValue={desk.recurredVotes}
                      label="Votos recurridos"
                    />
                    <DeskItemLabel
                      deskValue={desk.impugnedVotes}
                      label="Votos identidad impugnada"
                    />
                    <DeskItemLabel
                      className="bg-gray-100 rounded-md"
                      deskValue={desk.commandVotes}
                      label="Votos de comando electoral"
                    />
                    <DeskItemLabel
                      deskValue={desk.blankVotes}
                      label="Votos en blanco"
                    />
                    <hr className="border-t-gray-dark my-2 " />
                    <DeskItemLabel
                      className="bg-gray-100 rounded-md"
                      deskValue={desk.totalVotes}
                      label="Total"
                    />
                    <div className="container flex flex-row gap-4 justify-between">
                      <a
                        href="https://www.padron.gov.ar/cne_denuncias/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          className="gap-[5px] border-red border-2 rounded-xl flex justify-center items-center text-xs font-medium my-5 py-[5px] px-[10px] bg-white text-red !w-auto"
                          type="button"
                        >
                          <img
                            src="assets/icon/hand-speaker.svg"
                            alt="Icono megafono"
                          />
                          Denunciar fraude
                        </Button>
                      </a>

                      <Button className="gap-[5px] border-none text-white bg-violet-brand rounded-xl flex justify-center items-center text-xs font-medium  hover:border-violet-light my-5 py-[5px] px-[10px] !w-auto">
                        <img src="assets/icon/edit.svg" alt="Icono editar" />
                        Editar
                      </Button>
                    </div>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default DeskList;
