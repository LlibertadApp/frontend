import { Link } from 'react-router-dom';
import Button from '#/components/button';
import Navbar from '#/components/navbar';

const NotFoundPage = () => {
  return (
    <main>
      <Navbar routerLink="/home" showArrow={false} />
      <section className='mx-6 flex flex-col justify-center items-center mt-[90px]'>
        <div className='w-[126px] h-[126px] bg-violet-light-2 rounded-full flex justify-center items-center mb-6'>
          <img src='/assets/icon/dead-face.svg' alt='404' />
        </div>
        <h1 className='text-8xl text-violet-brand font-semibold text-center mt-4'>404</h1>
        <p className='text-base text-center font-medium text-[#485760] max-w-[224px]'>
          Ups. La página que estás buscando no existe.
        </p>
        <Link className='w-full max-w-xs bg-violet-brand rounded-xl p-4 mt-[98px] text-white' to='/home'>Volver al Inicio</Link>
      </section>
    </main>
    // <section className="min-h-screen flex flex-col items-center">
    //   <div className="md:w-1/2 w-5/6 flex flex-col m-auto gap-24">
    //     <div className="flex flex-col items-center gap-6">
    //       <h3 className="font-semibold text-8xl">404</h3>
    //       <img
    //         className="md:w-32"
    //         src="/assets/images/sad-face.svg"
    //         alt="not-found-page"
    //       />
    //       <p className="text-2xl">Lo sentimos, página no encontrada</p>
    //     </div>
    //     <Link to="/home">
    //       <Button
    //         type="button"
    //         className="bg-violet-brand p-3 text-white w-full rounded-xl text-xl tracking-wider shadow-md hover:border-violet-light"
    //         label="Ir al Inicio"
    //       />
    //     </Link>
    //   </div>
    // </section>
  );
};

export default NotFoundPage;
