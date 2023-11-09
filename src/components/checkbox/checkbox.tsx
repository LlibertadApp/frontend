import { Check } from '@phosphor-icons/react'
 
interface CheckboxProps {
  label?: string;
  children?: React.ReactNode;

  name?: string;
  id?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox({onChange, checked, label, children, name}: CheckboxProps) {
  return (
    <label className="flex gap-[10px] cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer hidden" name={name} />
      <div className='peer-checked:bg-violet-brand w-5 h-5 aspect-square flex justify-center items-center rounded-md border border-violet-light peer-checked:border-violet-brand'>
        <svg width={10} height={7.5} viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.76422 2.08544L4.15612 7.0896C3.84386 7.4146 3.34425 7.4146 3.032 7.0896L0.234191 4.1521C-0.0780638 3.8271 -0.0780638 3.3021 0.234191 2.9771C0.546447 2.6521 1.04606 2.6521 1.35831 2.9771L3.60655 5.3271L8.65259 0.910437C8.96485 0.585437 9.46446 0.585437 9.77671 0.910437C10.0765 1.23544 10.0765 1.76044 9.76422 2.08544Z" fill="white"/>
        </svg>
      </div>
      <span className="text-sm text-gray-700 text-left select-none">{children || label}</span>
    </label>
  );

}