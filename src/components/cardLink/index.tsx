import { Link } from 'react-router-dom';

interface Props {
  icon: string;
  text: string;
  link: string;
  color: 'red' | 'violet';
}

export const CardLink = ({ icon, text, link, color }: Props) => {
  let config;

  if (color === 'violet') {
    config = {
      hover: 'border-violet-light',
      text: 'text-violet-brand',
      bg: 'bg-violet-brand/5',
      icon: 'arrow-continue-purple.svg',
    };
  } else if(color === 'red') {
    config = {
      hover: 'border-red',
      text: 'text-red',
      bg: 'bg-red/5',
      icon: 'arrow-continue-red.svg',
    };
  }

  return (
    <Link
      to={`/${link}`}
      className={`border-2 border-black/5 ${config?.text} bg-transparent p-6 w-full rounded-xl shadow-md hover:${config?.hover} flex items-center justify-between`}
      type="submit"
    >
      <div className="flex items-center gap-4">
        <div className={`${config?.bg} w-16 h-16 rounded-full flex items-center justify-center`}>
          <img
            src={`assets/icon/${icon}`}
            alt="Alerta"
            className="w-6 h-6"
          />
        </div>
        <span className="text-sm font-medium">{text}</span>
      </div>
      <img
        src={`assets/icon/${config?.icon}`}
        alt="Ir"
        className="w-4 h-4"
      />
    </Link>
  );
};
