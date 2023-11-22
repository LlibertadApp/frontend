import EmptyImageIcon from "../icons/emptyImage";

export type UploadInputSize = 'md' | 'lg'; 

interface UploadInputProps {
  id: string;
  size?: UploadInputSize;
  className?: string;

  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadInput({ id, size, className, onChange }: UploadInputProps) {
  if (size === 'lg') return (
    <label htmlFor={id} className={className}>
      <EmptyImageIcon />
      <input
        onChange={onChange}
        id={id}
        type="file"
        className="hidden"
        accept="image/*" />
    </label>
  );

  return (
    <label htmlFor={id} className={className}>
      <span className="w-full font-medium rounded-xl flex flex-row gap-[10px] justify-center items-center bg-violet-brand text-white disabled:bg-gray-300 disabled:text-gray-500 p-[18px] text-lg">
        Subir imagen
      </span>
      <input
        onChange={onChange}
        id={id}
        type="file"
        className="hidden"
        accept="image/*" />
    </label>
  );
}