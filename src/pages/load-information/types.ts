export type HandleChangeFunction = (
  e: React.ChangeEvent<HTMLInputElement>,
) => void;

export interface ILoadInformationProps {
  message?: string;
}

export interface FormValues {
  circuit: number | string;
  table: number | string;
  electors: number | string;
  envelopes: number | string;
  validVotesDifference: boolean;

  totalVotes: number;
  correctData: boolean;
}

export interface ValidationProps {
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  onContextMenu: (e: React.MouseEvent<HTMLInputElement>) => void;
  onDrop: (e: React.DragEvent<HTMLInputElement>) => void;
  onWheel: (e: React.WheelEvent<HTMLInputElement>) => void;
  autoComplete: string;
}
