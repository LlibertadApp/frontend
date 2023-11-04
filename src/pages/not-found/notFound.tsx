import { Link } from 'react-router-dom';
import Button from '#/components/button';
import Navbar from '#/components/navbar';
import { paths } from '#/routes/paths';

const NotFoundPage = () => {
  return (
    <main>
      <Navbar routerLink={paths.home} showArrow={false} />
      <section className='mx-6 flex flex-col justify-center items-center mt-[90px]'>
        <div className='w-[126px] h-[126px] bg-violet-light-2 rounded-full flex justify-center items-center mb-6'>
          <img src='/assets/icon/dead-face.svg' alt='404' />
        </div>
        <h1 className='text-8xl text-violet-brand font-semibold text-center mt-4'>404</h1>
        <p className='text-base text-center font-medium text-[#485760] max-w-[224px]'>
          Ups. La página que estás buscando no existe.
        </p>
        <Link className='w-full max-w-xs bg-violet-brand rounded-xl p-4 mt-[98px] text-white' to={paths.home}>Volver al Inicio</Link>
      </section>
    </main>
  );
};

export default NotFoundPage;
