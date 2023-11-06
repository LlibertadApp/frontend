import { Link } from 'react-router-dom';
import { PropsCardLink, colors, typeConfigColors } from './types';

export const CardLink = ({
  icon,
  text,
  link,
  color,
  onClick,
}: PropsCardLink) => {
  let config: typeConfigColors = {
    hover: '',
    text: '',
    bg: '',
  };

  if (color === colors.Violet) {
    config = {
      hover: 'border-violet-light',
      text: 'text-violet-brand',
      bg: 'bg-violet-brand/5',
    };
  } else if (color === colors.Red) {
    config = {
      hover: 'border-red',
      text: 'text-red',
      bg: 'bg-red/5',
    };
  }

  return (
    <Link
      to={link}
      className={`border-2 border-black/5 ${config?.text} bg-transparent p-6 w-full rounded-xl shadow-md hover:${config?.hover} flex items-center justify-between`}
      type="submit"
      onClick={() => onClick && onClick()}
    >
      <div className="flex items-center gap-4">
        <div
          className={`${config?.bg} w-16 h-16 rounded-full flex items-center justify-center`}
        >
          {icon}
        </div>
        <span className="text-sm font-medium">{text}</span>
      </div>
      <img src="assets/icon/arrow-continue.svg" alt="Ir" className="w-4 h-4" />
    </Link>
  );
};
