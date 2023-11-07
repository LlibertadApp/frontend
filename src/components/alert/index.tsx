import classNames from 'classnames';
import { CheckCircle, XCircle } from '@phosphor-icons/react';

interface AlertProps {
  error?: boolean;
  message?: any;

  className?: string;
}

export default function Alert({ error, message, className }: AlertProps) {
  const alertClass = error ? 'bg-red-error/10 text-red-error' : 'bg-green-light/10 text-green-light';

  return (
    <div
      className={classNames(
        'flex justify-between items-center w-full px-3 py-[14px] rounded-2xl text-left',
        alertClass,
        className,
      )}
    >
      <span className='text-sm'>{message}</span>
      {
        error ? (
          <XCircle size={24} />
        ) : (
          <CheckCircle size={24} />
        )

      }
    </div>
  );
}