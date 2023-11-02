import { CardLink } from '#/components/cardLink';
import Navbar from '#/components/navbar';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

const IrregularitiesPage = () => {
  return (
    <>
      <Navbar routerLink="/home" />
      <main className="w-full flex justify-center">
        <section className="md:w-1/2 w-11/12 shadow-3xl rounded-xl py-8 flex flex-col items-center space-y-8">
          <h2 className="text-red uppercase text-4xl font-black">
            irregularidades
          </h2>

          <article className="w-full flex flex-col justify-start space-y-2">
            <span className="text-left w-full font-bold">
              Acciones de fiscales
            </span>
            <CardLink
              link={'irregularities'}
              text={'Impugnar mesa'}
              icon={'challenge-table.svg'}
              color={'red'}
            />
          </article>
          
          <article className="w-full flex flex-col justify-start space-y-2">
            <span className="text-left w-full font-bold">
                Denunciar irregularidades
            </span>
            <CardLink
              link={'irregularities'}
              text={'Se roban las boletas'}
              icon={'ballot-theft.svg'}
              color={'red'}
            />

            <CardLink
              link={'irregularities'}
              text={'Boletas adulteradas'}
              icon={'tampered-ballots.svg'}
              color={'red'}
            />

            <CardLink
              link={'irregularities'}
              text={'Otras irregularidades'}
              icon={'megaphone.svg'}
              color={'red'}
            />
          </article>
        </section>
      </main>
    </>
  );
};

export const Irregularities = observer(IrregularitiesPage);

export default Irregularities;
