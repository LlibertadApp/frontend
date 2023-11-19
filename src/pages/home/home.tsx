import { Link } from 'react-router-dom';
import {
  ArrowRight,
  EnvelopeOpen,
  ListBullets,
  Megaphone,
} from '@phosphor-icons/react';
import Navbar from '#/components/navbar';
import Overlay from '#/components/overlay';
import { paths } from '#/routes/paths';
import { CardLink } from '#/components/cardLink';
import { colors } from '#/components/cardLink/types';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Overlay>
        <Navbar routerLink={paths.home} showArrow={false} />
        <section className="flex justify-center px-4 py-10">
          <div className="w-full md:w-1/2 lg:w-full shadow-3xl rounded-xl py-4 flex flex-col items-center lg:max-w-[52.5rem]">
            <span className="text-violet-primary text-[2rem] lg:text-[2.5rem] font-black mb-4">
              ELECCIONES 2023
            </span>
            <div className="flex flex-col items-center space-y-2 w-full lg:space-y-4">
              <span className="w-full pt-8 text-left lg:text-center lg:text-2xl lg:mb-3 lg:pt-6">
                Acciones de fiscales
              </span>
              <CardLink
                link={paths.uploadActa}
                text={'Cargar resultados de tu mesa'}
                icon={<EnvelopeOpen size={32} />}
                color={colors.Violet}
              />
              <CardLink
                link={paths.votationTables}
                text={'Listado de mesas cargadas'}
                icon={<ListBullets size={32} />}
                color={colors.Violet}
              />
            </div>
          </div>
        </section>
      </Overlay>
    </div>
  );
};

export const Home = HomePage;

export default Home;
