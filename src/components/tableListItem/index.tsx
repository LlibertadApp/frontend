import Acta, { Status } from '#/interfaces/acta.interface';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';

import { CaretDown } from '@phosphor-icons/react';
import classNames from 'classnames';
import { useState } from 'react';

interface TableListItemProps {
  acta: Acta;
  expanded?: boolean;
}

function StatusIcon({ status }: { status: Status }) {
  const appearances: Record<Status, string> = {
    OK: 'bg-green/30 border-green',
    ENVIADO: 'bg-blue-400/30 border-blue-400',
    ANOMALIA: 'bg-red-error/30 border-red-error',
    PROCESANDO: 'bg-amber-500/50 border-amber-500',
  };

  const appearance = appearances[status] || appearances.ENVIADO;

  return <span className={`rounded-full w-5 h-5 border ${appearance}`} />;
}

function StatusBadge({ status }: { status: Status }) {
  const appearances: Record<Status, string> = {
    OK: 'bg-green/30 border-green',
    ENVIADO: 'bg-blue-400/30 border-blue-400',
    ANOMALIA: 'bg-red-error/30 border-red-error',
    PROCESANDO: 'bg-amber-500/50 border-amber-500',
  };

  const appearance = appearances[status] || appearances.ENVIADO;

  return <span className={`rounded-lg px-2 py-1 border text-sm ${appearance}`}>{status}</span>;
}

function CategoryLabel({ label, value, className }: { label: string; value: string | number; className?: string }) {
  return (
    <p className={classNames('text-black text-sm p-2 rounded-md flex justify-between', className)}>
      {label}: <span className="text-gray-400 px-2">{value}</span>
    </p>
  );
}

export default function TableListItem({ acta, expanded = false }: TableListItemProps) {
  const [isExpanded, setExpanded] = useState(expanded);

  return (
    <Accordion
      style={{
        border: '1px solid #E3E3E9',
        borderRadius: '8px',
        boxShadow: '0px 10px 10px 0px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
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
      <AccordionSummary expandIcon={<CaretDown />} classes={{ content: 'items-center gap-2' }}>
        {!isExpanded && <StatusIcon status={acta.estado} />}

        <div className="flex flex-col">
          <h3 className="text-black text-lg">
            <strong>Mesa</strong> {acta.mesaId.split('-').pop()}
          </h3>
          {!isExpanded && (
            <Typography color="#908DA8" align="left" fontFamily={'Poppins'} fontSize="12px">
              {acta.votosEnTotal} votos en total
            </Typography>
          )}
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <section className="flex gap-1 mb-5 items-center">
          <span>Estado de la mesa:</span>
          <StatusBadge status={acta.estado} />
        </section>
        <hr className="border-t-gray-dark my-2 " />
        <section className="flex flex-col odd:[&>p]:bg-gray-100">
          <CategoryLabel label="La Libertad Avanza" value={acta.conteoLla} />
          <CategoryLabel label="Union por la Patria" value={acta.conteoUp} />
          <CategoryLabel label="Votos nulos" value={acta.votosNulos} />
          <CategoryLabel label="Votos recurridos" value={acta.votosRecurridos} />
          <CategoryLabel label="Votos identidad impugnada" value={acta.votosImpugnados} />
          <CategoryLabel label="Votos en blanco" value={acta.votosEnBlanco} />
        </section>
        <hr className="border-t-gray-dark my-2 " />
        <section className="flex flex-col odd:[&>p]:bg-gray-100">
          <CategoryLabel label="Total" value={acta.votosEnTotal} className="bg-gray-100" />
        </section>
      </AccordionDetails>
    </Accordion>
  );
}
