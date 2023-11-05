import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '#/context/AuthContext';
import Button from '#/components/button';
import { INavbarProps } from './types';
import { useHamburgerMenu } from '#/context/HamburgerContext';
import useOutsideClick from '#/hooks/utils/use-outside-click';
import { paths } from '#/routes/paths';

const Navbar: React.FC<INavbarProps> = ({
  routerLink = paths.home,
  showArrow = true,
  showHamburger = true,
}) => {
  const linkTransformClassName =
    'transform transition-transform hover:scale-105';

  const { logout } = useAuth();
  const { menuOpen, setMenuOpen, closeMenu } = useHamburgerMenu();
  const hamburgerMenuRef = useOutsideClick(closeMenu);
  return (
    <div className="bg-violet-primary p-[10px] px-8 w-full flex flex-col h-18 relative z-20">
      <div className="w-full grid grid-rows-1 grid-col-3 place-items-center">
        <div className="flex w-full justify-between col-start-1 col-end-4 row-start-1 row-end-2">
          <div className="flex justify-center items-center">
            {showArrow && (
              <Link to={routerLink}>
                <img
                  src="assets/images/back-arrow.svg"
                  alt="Volver"
                  className="object-cover rounded w-4 h-auto"
                />
              </Link>
            )}
          </div>
          <div
            className="flex flex-col justify-center z-20"
            ref={hamburgerMenuRef}
          >
            {showHamburger && (
              <div
                className="flex justify-center cursor-pointer transform transition-transform hover:scale-90"
                onClick={() => {
                  setMenuOpen(!menuOpen);
                }}
              >
                {!menuOpen ? (
                  <img
                    src="assets/icon/menu.svg"
                    alt="User profile"
                    className="object-cover rounded w-6 h-6"
                  />
                ) : (
                  <img
                    src="assets/icon/close.svg"
                    alt="User profile"
                    className="object-cover rounded w-6 h-6 p-[5px]"
                  />
                )}
              </div>
            )}

            {menuOpen && (
              <div className="absolute w-[100vw] bg-white right-0 top-[72px] rounded-xl px-1 shadow-2xl">
                <div className="absolute top-[-15px] right-[69px] w-0 h-0">
                  <svg width="50" height="20">
                    <polygon points="25,0 0,50 50,50" fill="white" />
                  </svg>
                </div>
                <div className="w-full text-left py-4 px-8 pt-6 border-b-2 border-gray-100 font-bold text-xl text-violet-brand">
                  <span>Javier</span>
                </div>
                <div className="flex flex-col px-[30px] py-[25px] gap-y-6 items-start text-left text-text-off">
                  {/* El gris pactado no se parece al de figma */}
                  {/* <Link
                    to={paths.profile}
                    className={linkTransformClassName}
                    onClick={closeMenu}
                  >
                    Mi cuenta
                  </Link> */}
                  <Link
                    to={paths.totalResults}
                    className={linkTransformClassName}
                    onClick={closeMenu}
                  >
                    Ver resultados
                  </Link>
                  <Link
                    to={paths.uploadCertificate}
                    className={linkTransformClassName}
                    onClick={closeMenu}
                  >
                    Cargar resultados de mesa
                  </Link>
                  <Link
                    to={paths.home}
                    className={`${linkTransformClassName} text-violet-light`}
                    onClick={() => {
                      alert('No existe la ruta aún');
                      closeMenu();
                    }}
                  >
                    Listado de mesas cargadas
                  </Link>
                  <Link
                    to={paths.home}
                    className={`${linkTransformClassName} text-red`}
                    onClick={() => {
                      alert('No existe la ruta aún');
                      closeMenu();
                    }}
                  >
                    Denunciar fraude
                  </Link>
                </div>
                <div className="flex w-full text-left py-7 white px-8 border-t-2 border-gray-100 ">
                  <div className={`${linkTransformClassName} flex gap-2`}>
                    <Button
                      appearance='ghost'
                      onClick={() => {
                        logout();
                        closeMenu();
                      }}
                      type="button"
                      className="text-violet-light text-left">
                      <img
                        src="assets/icon/log-out.svg"
                        alt="User profile"
                        className="object-cover rounded"/>
                      Inicio de sesión
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex col-start-2 col-end-3 row-start-1 row-end-2">
          <Link to={paths.home} className="flex-shrink-0 ml-auto">
            <img
              src="assets/logos/fenix-new.svg"
              alt="Logo"
              className="object-cover rounded w-[60px] h-[60px] cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
