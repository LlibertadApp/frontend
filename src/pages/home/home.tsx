import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import Navbar from '#/components/navbar';
import Overlay from '#/components/overlay';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Overlay>
      <Navbar routerLink="/home" showArrow={false} />
      <section className="flex justify-center">
        <div className="md:w-1/2 w-11/12 shadow-3xl rounded-xl py-8 flex flex-col items-center space-y-8">
          <span className="text-violet-brand text-4xl font-black">
            ELECCIONES 2023
          </span>
          <div className="flex flex-col items-center space-y-2 w-full">
            <span className="text-left w-full font-normal">
              Acciones de fiscales
            </span>
            <Link
              to="/upload-certificate"
              className="border-2 border-black/5 text-violet-brand bg-transparent p-6 w-full rounded-xl shadow-md hover:border-violet-light flex items-center justify-between"
              type="submit"
            >
              <div className="flex items-center gap-4">
                <div className="bg-violet-brand/5 w-16 h-16 rounded-full flex items-center justify-center">
                  <img
                    src="src/assets/icon/mail-open.svg"
                    alt="Correo abierto"
                    className="w-6 h-6"
                    style={{ fill: 'red' }}
                  />
                </div>
                <span className="text-sm font-medium">
                  Cargar resultados de tu mesa
                </span>
              </div>
              <img
                src="src/assets/icon/arrow-continue-purple.svg"
                alt="Ir"
                className="w-4 h-4"
              />
            </Link>
            <Link
              to="/total-results"
              className="border-2 border-black/5 text-red bg-transparent p-6 w-full rounded-xl shadow-md hover:border-red flex items-center justify-between"
              type="submit"
            >
              <div className="flex items-center gap-4">
                <div className="bg-red/5 w-16 h-16 rounded-full flex items-center justify-center">
                  <img
                    src="src/assets/icon/warn-icon.svg"
                    alt="Alerta"
                    className="w-6 h-6"
                  />
                </div>
                <span className="text-sm font-medium">
                  Impugnar o denunciar mesa
                </span>
              </div>
              <img
                src="src/assets/icon/arrow-continue-red.svg"
                alt="Ir"
                className="w-4 h-4"
              />
            </Link>
          </div>

          <div className="flex flex-col items-center space-y-2 w-full">
            <span className="text-left w-full font-normal">
              Escrutinio y resultados
            </span>
            <Link
              to="/total-results"
              className="border-2 border-black/5 text-gray-500 bg-transparent p-2 w-full rounded-xl shadow-md hover:border-black/20 flex flex-col items-center justify-between gap-4"
              type="submit"
            >
              <div className="flex text-center justify-between w-full gap-6">
                <div className="flex flex-col justify-between gap-4 p-4 bg-uxp/5 rounded-lg w-full">
                  <img
                    src="src/assets/logos/uxp.svg"
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
                    src="src/assets/logos/lla-logo.svg"
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
              <div className="underline text-violet-brand py-4">
                Ver Escrutinio
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
