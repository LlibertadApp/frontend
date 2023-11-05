import { CardLink } from '#/components/cardLink';
import { colors } from '#/components/cardLink/types';
import Navbar from '#/components/navbar';
import { paths } from '#/routes/paths';
import { observer } from 'mobx-react';

const IrregularitiesPage = () => {
  return (
    <>
      <Navbar routerLink={paths.home} />
      <main className="w-full flex justify-center">
        <section className="md:w-1/2 w-11/12 shadow-3xl rounded-xl py-8 flex flex-col items-center space-y-8">
          <h2 className="text-violet-brand uppercase text-4xl font-black">
            IRREGULARIDADES
          </h2>

          <article className="w-full flex flex-col justify-start space-y-2">
            <span className="text-left w-full font-bold">
              Acciones de fiscales
            </span>
            <CardLink
              link={paths.irregularities}
              text={'Impugnar mesa'}
              icon={'challenge-table.svg'}
              color={colors.Red}
            />
          </article>

          <article className="w-full flex flex-col justify-start space-y-2">
            <span className="text-left w-full font-bold">
              Denunciar irregularidades
            </span>
            <CardLink
              link={paths.irregularities}
              text={'Se roban las boletas'}
              icon={'ballot-theft.svg'}
              color={colors.Red}
            />

            <CardLink
              link={paths.irregularities}
              text={'Boletas adulteradas'}
              icon={'tampered-ballots.svg'}
              color={colors.Red}
            />

            <CardLink
              link={paths.irregularities}
              text={'Otras irregularidades'}
              icon={'megaphone.svg'}
              color={colors.Red}
            />
          </article>
        </section>
      </main>
    </>
  );
};

export const Irregularities = observer(IrregularitiesPage);

export default Irregularities;
