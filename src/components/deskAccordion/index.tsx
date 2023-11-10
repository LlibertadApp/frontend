import Button from '#/components/button';
import { Desk } from '#/interfaces/IDesk';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import DropIcon from '../dropIcon';
import DeskItemLabel from '../deskItemLabel';

interface DeskProps {
  desk: Desk;
}

const DeskAccordion = ({ desk }: DeskProps) => {
  return (
    <Accordion
      key={desk.id}
      style={{
        border: '1px linear #ccc',
        marginBottom: '1rem',
        borderRadius: '8px',
        boxShadow: '0px 2px 5px 0px rgba(0, 0, 0, 0.25)',
      }}
      sx={{
        '&:before': {
          display: 'none',
        },
      }}
    >
      <AccordionSummary expandIcon={<DropIcon />} className="pb-4">
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '0.6rem',
          }}
        >
          <img
            className="w-4 h-4"
            src="assets/icon/green-circle.svg"
            alt="green-circle"
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}
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
            <Typography
              color={{
                color: '#908DA8',
              }}
              align="left"
              fontFamily={'Poppins'}
              fontSize="12px"
            >
              {desk.electors} electores
            </Typography>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <DeskItemLabel
          className="bg-gray-100 rounded-md"
          deskValue={desk.circuit}
          label="Circuito"
        />
        <DeskItemLabel deskValue={desk.electors} label="Nro. de electores" />
        <DeskItemLabel
          className="bg-gray-100 rounded-md"
          deskValue={desk.envelopes}
          label="Nro. de sobres"
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
        <DeskItemLabel deskValue={desk.nullVotes} label="Votos nulos" />
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
        <DeskItemLabel deskValue={desk.blankVotes} label="Votos en blanco" />

        <hr className="border-t-gray-dark my-2 " />

        <DeskItemLabel
          className="bg-gray-100 rounded-md"
          deskValue={desk.totalVotes}
          label="Total"
        />
        <DeskItemLabel
          deskValue={desk.status.normal ? 'Normal' : 'Irregular'}
          label="Estado"
          statusStyle={
            desk.status.normal ? { color: '#439676' } : { color: '#AD3459' }
          }
        />

        <div className="container flex flex-row gap-4 justify-between">
          <Button className="gap-[5px] border-none text-white bg-violet-brand rounded-xl flex justify-center items-center text-xs font-medium  hover:border-violet-light my-5 py-[5px] px-[10px] !w-auto">
            <img src="assets/icon/edit.svg" alt="Icono editar" />
            Editar
          </Button>

          <Button
            className="gap-[5px] border-red border-2 rounded-xl flex justify-center items-center text-xs font-medium my-5 py-[5px] px-[10px] bg-white text-red !w-auto"
            type="button"
          >
            <img src="assets/icon/hand-speaker.svg" alt="Icono megafono" />
            Denunciar fraude
          </Button>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default DeskAccordion;
