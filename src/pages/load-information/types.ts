export interface ILoadInformationProps {
  message?: string;
}

export interface FormValues {
  circuit: number | string;
  table: number | string;
  electors: number | string;
  envelopes: number | string;
  votesDifference: boolean;
  correctCertificateData: boolean;
  totalVotes: number;
  correctData: boolean;
}
