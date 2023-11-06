import Button from '#/components/button';
import Navbar from '#/components/navbar';
import { paths } from '#/routes/paths';
import Overlay from '#/components/overlay';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';

const DeskList = () => {
  const DummyData = {
    desks: [
      {
        id: 1,
        name: 'Mesa 484',
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
        name: 'Mesa 777',
        description: '',
        status: {
          warning: 'Irregular',
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

  const DropIcon = () => {
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

  return (
    <main>
      <Overlay>
        <Navbar routerLink={paths.home} showArrow={true} />
        <section className="flex p-4 justify-center">
          <div className="pt-8 overflow-x-hidden">
            {/* No hay datos, no hay mesas para mostrar */}
            <span className="text-violet-brand text-[2rem] font-black pt-4 start container">
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
              <div className="py-4 justify-center">
                {DummyData.desks.map((desk) => (
                  <Accordion
                    key={desk.id}
                    style={{
                      border: '1px linear #ccc',
                      marginBottom: '1rem',
                      borderRadius: '8px',
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<DropIcon />}
                      className="pb-4"
                    >
                      <Typography
                        color={{
                          color: desk.status.normal ? '#439676' : '#AD3459',
                        }}
                        align="left"
                        fontFamily={'Poppins'}
                        fontSize="18px"
                      >
                        {desk.name}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography
                        color={'black'}
                        align="left"
                        fontFamily={'Poppins'}
                        flexDirection={'row'}
                        fontSize="14px"
                      >
                        <div className="bg-gray-100 rounded-md">
                          <span className="flex flex-row py-2 text-m px-2">
                            Circuito:{' '}
                            <p className="text-gray-400 px-2">
                              {desk.electors}
                            </p>
                          </span>
                        </div>
                      </Typography>

                      <Typography
                        color={'black'}
                        align="left"
                        fontFamily={'Poppins'}
                        flexDirection={'row'}
                        fontSize="14px"
                      >
                        <div className="">
                          <span className="flex flex-row py-2 text-m px-2">
                            Nro. de electores:{' '}
                            <p className="text-gray-400 px-2">
                              {desk.electors}
                            </p>
                          </span>
                        </div>
                      </Typography>

                      <Typography
                        color={'black'}
                        align="left"
                        fontFamily={'Poppins'}
                        flexDirection={'row'}
                        fontSize="14px"
                      >
                        <div className="bg-gray-100 rounded-md">
                          <span className="flex flex-row py-2 text-m px-2">
                            Nro. de sobres:{' '}
                            <p className="text-gray-400 px-2">
                              {desk.envelopes}
                            </p>
                          </span>
                        </div>
                      </Typography>

                      <div className="p-1">
                        <svg
                          width="390"
                          height="1"
                          viewBox="0 0 390 1"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <line
                            x1="4.37114e-08"
                            y1="0.5"
                            x2="390"
                            y2="0.5"
                            stroke="#000000"
                          />
                        </svg>
                      </div>

                      <Typography
                        color={'black'}
                        align="left"
                        fontFamily={'Poppins'}
                        flexDirection={'row'}
                        fontSize="14px"
                      >
                        <div className="">
                          <span className="flex flex-row py-2 text-m px-2">
                            {desk.candidate1.name}:{' '}
                            <p className="text-gray-400 px-2">
                              {desk.candidate1.votes}
                            </p>
                          </span>
                        </div>
                      </Typography>

                      <Typography
                        color={'black'}
                        align="left"
                        fontFamily={'Poppins'}
                        flexDirection={'row'}
                        fontSize="14px"
                      >
                        <div className="bg-gray-100 rounded-md">
                          <span className="flex flex-row py-2 text-m px-2">
                            {desk.candidate2.name}:{' '}
                            <p className="text-gray-400 px-2">
                              {desk.candidate2.votes}
                            </p>
                          </span>
                        </div>
                      </Typography>

                      <Typography
                        color={'black'}
                        align="left"
                        fontFamily={'Poppins'}
                        flexDirection={'row'}
                        fontSize="14px"
                      >
                        <div className="">
                          <span className="flex flex-row py-2 text-m px-2">
                            Votos nulos:{' '}
                            <p className="text-gray-400 px-2">
                              {desk.nullVotes}
                            </p>
                          </span>
                        </div>
                      </Typography>

                      <Typography
                        color={'black'}
                        align="left"
                        fontFamily={'Poppins'}
                        flexDirection={'row'}
                        fontSize="14px"
                      >
                        <div className="bg-gray-100 rounded-md">
                          <span className="flex flex-row py-2 text-m px-2">
                            Votos recurridos:{' '}
                            <p className="text-gray-400 px-2">
                              {desk.recurredVotes}
                            </p>
                          </span>
                        </div>
                      </Typography>

                      <Typography
                        color={'black'}
                        align="left"
                        fontFamily={'Poppins'}
                        flexDirection={'row'}
                        fontSize="14px"
                      >
                        <div className="">
                          <span className="flex flex-row py-2 text-m px-2">
                            Votos identidad impugnada:{' '}
                            <p className="text-gray-400 px-2">
                              {desk.envelopes}
                            </p>
                          </span>
                        </div>
                      </Typography>

                      <Typography
                        color={'black'}
                        align="left"
                        fontFamily={'Poppins'}
                        flexDirection={'row'}
                        fontSize="14px"
                      >
                        <div className="bg-gray-100 rounded-md">
                          <span className="flex flex-row py-2 text-m px-2">
                            Votos de comando electoral:{' '}
                            <p className="text-gray-400 px-2">
                              {desk.envelopes}
                            </p>
                          </span>
                        </div>
                      </Typography>

                      <Typography
                        color={'black'}
                        align="left"
                        fontFamily={'Poppins'}
                        flexDirection={'row'}
                        fontSize="14px"
                      >
                        <div className="">
                          <span className="flex flex-row py-2 text-m px-2">
                            Votos en blanco{' '}
                            <p className="text-gray-400 px-2">
                              {desk.envelopes}
                            </p>
                          </span>
                        </div>
                      </Typography>

                      <div className="p-1">
                        <svg
                          width="390"
                          height="1"
                          viewBox="0 0 390 1"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <line
                            x1="4.37114e-08"
                            y1="0.5"
                            x2="390"
                            y2="0.5"
                            stroke="#000000"
                          />
                        </svg>
                      </div>

                      <Typography
                        color={'black'}
                        align="left"
                        fontFamily={'Poppins'}
                        flexDirection={'row'}
                        fontSize="14px"
                      >
                        <div className="bg-gray-100 rounded-md">
                          <span className="flex flex-row py-2 text-m px-2">
                            Total{' '}
                            <p className="text-gray-400 px-2">
                              {desk.envelopes}
                            </p>
                          </span>
                        </div>
                      </Typography>

                      <Typography
                        color={'green'}
                        align="left"
                        fontFamily={'Poppins'}
                        flexDirection={'row'}
                        fontSize="14px"
                      >
                        <div className="">
                          <span className="flex flex-row py-2 text-m text-black px-2">
                            Estado:{' '}
                            <p
                              className="px-2"
                              style={{
                                color: desk.status.normal
                                  ? '#439676'
                                  : '#AD3459',
                              }}
                            >
                              {desk.status.normal ? 'Normal' : 'Irregular'}
                            </p>
                          </span>
                        </div>
                      </Typography>

                      <div className="container flex flex-row gap-4 justify-between">
                        <Button className="gap-[5px] border-none text-white bg-violet-brand rounded-xl flex justify-center items-center text-xs font-medium  hover:border-violet-light my-5 py-[5px] px-[10px] !w-auto">
                          <img src="assets/icon/edit.svg" alt="Icono editar" />
                          Editar
                        </Button>

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
                      </div>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
            )}
          </div>
        </section>
      </Overlay>
    </main>
  );
};

export default DeskList;
