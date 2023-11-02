import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
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
        <section className="flex justify-center">
          <div className="md:w-1/2 w-11/12 shadow-3xl rounded-xl py-8 flex flex-col items-center space-y-8">
            <span className="text-violet-brand text-4xl font-black">
              ELECCIONES 2023
            </span>
            <div className="flex flex-col items-center space-y-2 w-full">
              <span className="text-left w-full font-normal">
                Acciones de fiscales
              </span>
              <CardLink
                link={paths.uploadCertificate}
                text={'Cargar resultados de tu mesa'}
                icon={'mail-open-outlined.svg'}
                color={colors.Violet}
              />
              <CardLink
                link={paths.home}
                text={'Listado de mesas cargadas'}
                icon={'list.svg'}
                color={colors.Violet}
                onClick={() => {
                  alert('No existe la ruta aún');
                }}
              />
              <CardLink
                link={paths.irregularities}
                text={'Denunciar Irregularidades'}
                icon={'hand-speaker.svg'}
                color={colors.Red}
              />
            </div>

            <div className="flex flex-col items-center space-y-2 w-full">
              <span className="text-left w-full font-normal">
                Escrutinio y resultados
              </span>
              <Link
                to={paths.totalResults}
                className="border-2 border-black/5 text-gray-500 bg-transparent p-2 w-full rounded-xl shadow-md hover:border-black/20 flex flex-col items-center justify-between gap-4"
                type="submit"
              >
                <div className="flex text-center justify-between w-full gap-6">
                  <div className="flex flex-col justify-between gap-4 p-4 bg-uxp/5 rounded-lg w-full">
                    <img
                      src="assets/logos/uxp.svg"
                      alt="union por la patria logo"
                      className="h-16"
                    />
                    <div className="text-xs font-bold">UNIÓN POR LA PATRIA</div>
                    <div className="flex flex-col gap-2">
                      <div className="text-xs">10.517.312 votos</div>
                      <div className="text-2xl font-bold text-uxp">38.95%</div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between gap-4 p-4 bg-violet-brand/5 rounded-lg w-full">
                    <img
                      src="assets/logos/lla-logo.svg"
                      alt="la libertad avanza logo"
                      className="h-16"
                    />
                    <div className="text-xs font-bold">LA LIBERTAD AVANZA</div>
                    <div className="flex flex-col gap-2">
                      <div className="text-xs">16.482.688 votos</div>
                      <div className="text-2xl font-bold text-violet-brand">
                        61.05%
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full p-4 text-sm font-normal text-white bg-violet-brand rounded-2xl flex justify-center items-center gap-3">
                  Ver escrutinio{' '}
                  <img
                    src="assets/images/back-arrow.svg"
                    className="rotate-180 h-4 w-4"
                  />
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
