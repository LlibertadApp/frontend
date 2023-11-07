import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import { Pencil, Trash, Plus, CheckCircle, Watch } from '@phosphor-icons/react';
import { DashboardAccordionProps, DashboardStateProps } from './types';

export const DashboardState: React.FC<DashboardStateProps> = ({ state }) => {
  const circleBaseClasses =
    'inline-block h-6 rounded-lg flex items-center justify-center text-[12px]';
  const activeClasses = 'bg-[#58C29920] border border-[#439676] text-[#439676]';
  const inactiveClasses =
    'bg-[#E13C3C20] border border-[#E13C3C] text-[#E13C3C]';

  if (state === 'active')
    return (
      <div className={`${circleBaseClasses} ${activeClasses}`}>
        <div className={'text-lg'}>
          <CheckCircle />
        </div>
        Active
      </div>
    );

  if (state === 'inactive')
    return (
      <div className={`${circleBaseClasses} ${inactiveClasses}`}>
        <div className={'text-lg'}>
          <Watch />
        </div>
        Inactive
      </div>
    );
};

export const DashboardAccordion: React.FC<DashboardAccordionProps> = ({
  data,
}) => {
  return (
    <Accordion
      style={{ marginTop: '4px', borderRadius: '16px' }}
      disableGutters
      elevation={0}
      sx={{
        '&:before': {
          display: 'none',
        },
      }}
    >
      <AccordionSummary
        expandIcon={<Plus />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div>
          <div></div>
          <div>
            {data.name} {data.lastname}
          </div>
          <div className="text-[#363745] text-xs">{data.email}</div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="text-start">
          <div className="w-20 mb-6">
            <DashboardState state={data.state} />
          </div>
          <div className="text-xs">Email:</div>
          <div className="text-[#363745] text-sm">{data.email}</div>
          <br />
          <div className="text-xs">DNI:</div>
          <div className="text-[#363745] text-sm">{data.dni}</div>
          <br />
          <div className="text-xs">Teléfono:</div>
          <div className="text-[#363745] text-sm">{data.phone}</div>
          <br />
          <div className="text-xs">Estado:</div>
          <div className="text-[#363745] text-sm">{data.state}</div>
        </div>
        <div className="flex justify-between">
          <Button endIcon={<Trash />}>Eliminar</Button>
          <Button endIcon={<Pencil />}>Editar</Button>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};
