import Acta from '#/interfaces/acta.interface';
import TableListItem from '../tableListItem';

interface TableListProps {
  actas: Acta[];
}

export default function TableList({ actas }: TableListProps) {
  if (!actas?.length) {
    return (
      <div className="flex flex-col items-center pt-[17.5]">
        <img src="assets/icon/box-icon.svg" alt="box icon" />
        <p className="py-[26px] px-4 text-xl font-normal text-center">Todavía no hay ninguna mesa cargada</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Circuito {actas[0].mesaId.split("-")[2]} */}
      {/* // Esto es para mostrar el circuito, habría que ver cómo implementar en caso de que un usuario tenga más de un circuito. */}
      {actas.map((acta) => (
        <TableListItem acta={acta} key={acta.mesaId} />
      ))}
    </div>
  );
}
