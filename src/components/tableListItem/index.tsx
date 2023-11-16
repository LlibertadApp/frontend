import { IDeskItemLabel, IDeskNormalStatus } from '#/pages/desk-list/types';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';

import { CaretDown } from '@phosphor-icons/react';
import { FC, useState } from 'react';

interface Acta {
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  id: string;
  mesaId: string;
  userId: string;
  conteoLla: number;
  conteoUp: number;
  votosImpugnados: number;
  votosNulos: number;
  votosEnBlanco: number;
  votosRecurridos: number;
  votosEnTotal: number;
  estado: string;
}

interface TableListItemProps {
  acta: Acta;
  expanded?: boolean;
}

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

export default function TableListItem({
  acta,
  expanded = false,
}: TableListItemProps) {
  const [isExpanded, setExpanded] = useState(expanded);

  return (
    <Accordion
      style={{
        border: '1px solid #E3E3E9',
        borderRadius: '8px',
        boxShadow: '0px 10px 10px 0px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        margin: '10px 0px',
        width: '300px',
      }}
      sx={{
        boxShadow: 'none',
        '&:before': {
          display: 'none',
        },
      }}
      expanded={isExpanded}
      onChange={() => setExpanded(!isExpanded)}
    >
      <AccordionSummary
        expandIcon={<CaretDown />}
        className="pb-4"
        classes={{ content: 'items-center gap-2' }}
      >
        {/* TODO: Fixear el estado */}
        {!isExpanded && <EllipseIcon deskNormalStatus={true} />}
        <div className="flex flex-col">
          <Typography
            color="#363745"
            align="left"
            fontFamily={'Poppins'}
            fontSize="18px"
          >
            <strong>Mesa</strong> {acta.mesaId}
          </Typography>
          {!isExpanded && (
            <Typography
              color="#908DA8"
              align="left"
              fontFamily={'Poppins'}
              fontSize="12px"
            >
              {acta.votosEnTotal} votos en total
            </Typography>
          )}
        </div>
      </AccordionSummary>
      <AccordionDetails>
        {/* ToDo: FIX Por Status */}
        <DeskStatus deskNormalStatus={true} />
        <hr className="border-t-gray-dark my-2 " />
        <DeskItemLabel
          deskValue={acta.conteoLla}
          label={'Javier Gerardo Milei'}
        />
        <DeskItemLabel
          className="bg-gray-100 rounded-md"
          deskValue={acta.conteoUp}
          label={'Sergio Tomás Massa'}
        />
        <DeskItemLabel deskValue={acta.votosNulos} label="Votos nulos" />
        <DeskItemLabel
          className="bg-gray-100 rounded-md"
          deskValue={acta.votosRecurridos}
          label="Votos recurridos"
        />
        <DeskItemLabel
          deskValue={acta.votosImpugnados}
          label="Votos identidad impugnada"
        />
        <DeskItemLabel deskValue={acta.votosEnBlanco} label="Votos en blanco" />
        <hr className="border-t-gray-dark my-2 " />
        <DeskItemLabel
          className="bg-gray-100 rounded-md"
          deskValue={acta.votosEnTotal}
          label="Total"
        />
      </AccordionDetails>
    </Accordion>
  );
}
