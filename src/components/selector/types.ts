export interface ISelectorProps {
  onChange: (e: any) => void;
  label: string;
  options: { key: string; label: string }[];
  value: string;
}
