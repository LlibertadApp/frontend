import React from 'react';
import { Link } from 'react-router-dom';

import { useHamburgerMenu } from '#/context/HamburgerContext';
import useOutsideClick from '#/hooks/utils/use-outside-click';

import Button from '#/components/button';
import LogoutModal from '../confirmationModal';

import { paths } from '#/routes/paths';
import { ICloseMenuProps, INavbarProps } from './types';

const linkTransformClassName = 'transform transition-transform hover:scale-105';

const userName = sessionStorage.getItem('userName');

const CloseMenuLink: React.FC<ICloseMenuProps> = ({ label, to, className }) => {
  const { closeMenu } = useHamburgerMenu();
  return (
    <Link
      to={to}
      className={`${linkTransformClassName} ${className}`}
      onClick={closeMenu}
    >
      {label}
    </Link>
  );
};

const Navbar: React.FC<INavbarProps> = ({
  routerLink = paths.home,
  showArrow = true,
  showHamburger = true,
}) => {
  const { menuOpen, setMenuOpen, closeMenu } = useHamburgerMenu();
  const [logoutModal, setLogoutModal] = React.useState(false);
  const hamburgerMenuRef = useOutsideClick(closeMenu);
  return (
    <div className="bg-violet-primary p-[10px] px-4 w-full flex flex-col h-18 relative z-20 lg:items-center">
      <div className="w-full grid grid-rows-1 grid-col-3 place-items-center lg:max-w-[100vw]">
        <div className="flex w-full justify-between col-start-1 col-end-4 row-start-1 row-end-2">
          <div className="flex justify-center items-center">
            {showArrow && (
              <Link to={routerLink}>
                <img
                  src="/assets/images/back-arrow.svg"
                  alt="Volver"
                  className="object-cover rounded w-4 h-auto"
                />
              </Link>
            )}
          </div>
          <div
            className="flex flex-col justify-center z-20 lg:max-w-md"
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
                    src="/assets/icon/menu.svg"
                    alt="User profile"
                    className="object-cover rounded w-6 h-6 mr-2"
                  />
                ) : (
                  <img
                    src="/assets/icon/close.svg"
                    alt="User profile"
                    className="object-cover rounded w-6 h-6 p-[5px] mr-2"
                  />
                )}
              </div>
            )}
            {menuOpen && (
              <div className="absolute max-w-[400px] mr-2 bg-white right-0 top-[72px] rounded-xl px-1 shadow-2xl ">
                <div className="absolute top-[-15px] right-[53px] w-0 h-0">
                  <svg width="50" height="20">
                    <polygon points="25,0 0,50 50,50" fill="white" />
                  </svg>
                </div>
                <div className="w-full text-left py-4 px-8 pt-6 border-b-2 border-gray-100 font-bold text-xl text-violet-brand">
                  <span>{userName}</span>
                </div>
                <div className="flex flex-col px-[30px] py-[25px] gap-y-6 items-start text-left text-text-off">
                  <CloseMenuLink label="Inicio" to={paths.home} />
                  <CloseMenuLink
                    label="Cargar resultados de mesa"
                    to={paths.uploadActa}
                  />
                  <CloseMenuLink
                    label="Listado de mesas cargadas"
                    to={paths.votationTables}
                    className="text-violet-light"
                  />
                </div>
                <div className="flex w-full text-left py-4 white px-4 border-t-2 border-gray-100 ">
                  <div className={`${linkTransformClassName} flex gap-2`}>
                    <Button
                      appearance="ghost"
                      onClick={() => {
                        setLogoutModal(!logoutModal);
                      }}
                      type="button"
                      className="text-violet-light text-left"
                    >
                      <LogoutModal
                        open={logoutModal}
                        setOpen={setLogoutModal}
                      />
                      <img
                        src="/assets/icon/log-out.svg"
                        alt="User profile"
                        className="object-cover rounded"
                      />
                      Cerrar sesión
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
              src="/assets/logos/fenix-new.svg"
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
