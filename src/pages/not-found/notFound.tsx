const NotFoundPage = () => {
  return (
    <main>
      <section className='mx-6 flex flex-col justify-center items-center mt-[90px]'>
        <div className='w-[126px] h-[126px] bg-violet-light-2 rounded-full flex justify-center items-center mb-6'>
          <img src='/assets/icon/dead-face.svg' alt='404' />
        </div>
        <h1 className='text-8xl text-violet-primary font-semibold text-center mt-4'>404</h1>
        <p className='text-base text-center font-medium text-[#485760] max-w-[224px]'>
          Ups. La página que estás buscando no existe.
        </p>
      </section>
    </main>
  );
};

export default NotFoundPage;
