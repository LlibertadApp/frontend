import { observer } from 'mobx-react-lite';
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
import LoadingSpinner from '#/components/loadingSpinner';
import Button from '#/components/button';

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
                link={paths.uploadCertificate}
                text={'Cargar resultados de tu mesa'}
                icon={<EnvelopeOpen size={32} />}
                color={colors.Violet}
              />
              <CardLink
                link={paths.deskList}
                text={'Listado de mesas cargadas'}
                icon={<ListBullets size={32} />}
                color={colors.Violet}
              />
              <CardLink
                link={paths.irregularities}
                text={'Denunciar irregularidades'}
                icon={<Megaphone size={32} />}
                color={colors.Red}
              />
            </div>

            <div className="flex flex-col items-center space-y-2 w-full">
              <span className=" w-full pt-12 font-bold text-left lg:text-2xl">
                Escrutinio y resultados
              </span>
              <Link
                to={paths.totalResults}
                className="border-2 border-black/5 text-gray-dark bg-transparent p-2 w-full rounded-xl shadow-lg hover:border-black/20 flex flex-col items-center justify-between gap-[10px]"
                type="submit"
              >
                <div className="flex text-center justify-between w-full gap-6">
                  <div className="flex flex-col justify-between gap-4 p-4 bg-party-uxp/5 rounded-lg w-full">
                    <img
                      src="assets/logos/uxp.svg"
                      alt="union por la patria logo"
                      className="h-16"
                    />
                    <div className="text-[10px] font-bold">
                      UNIÓN POR LA PATRIA
                    </div>
                  </div>
                  <div className="flex flex-col justify-between gap-[10px] p-4 bg-violet-brand/5 rounded-lg w-full">
                    <img
                      src="assets/logos/lla-logo.svg"
                      alt="la libertad avanza logo"
                      className="h-16"
                    />
                    <div className="text-[10px] font-bold">
                      LA LIBERTAD AVANZA
                    </div>
                  </div>
                </div>
                <div className="w-full p-3 text-xs font-normal text-white bg-violet-primary rounded-xl flex justify-center items-center gap-3 lg:w-60 lg:text-sm lg:my-6">
                  Ver escrutinio
                  <ArrowRight size={20} />
                </div>
              </Link>
            </div>
          </div>
        </section>
      </Overlay>
    </div>
  );
};

export const Home = observer(HomePage);

export default Home;
