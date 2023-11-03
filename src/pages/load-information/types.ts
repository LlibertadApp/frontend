export interface ILoadInformationProps {
  message?: string;
}

export interface FormValues {
  circuit: number | string;
  table: number | string;
  electors: number | string;
  envelopes: number | string;
  totalVotes: number;
  correctData: boolean;
}
