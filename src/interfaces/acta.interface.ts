export type Status = 'OK' | 'ANOMALIA' | 'ENVIADO' | 'PROCESANDO';

export default interface Acta {
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
    estado: Status;
}
