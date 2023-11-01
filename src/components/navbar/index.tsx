import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '#/context/AuthContext';
import Button from '#/components/button';
import { INavbarProps } from './types';
import { useHamburgerMenu } from '#/context/HamburgerContext';
import useOutsideClick from '#/hooks/utils/use-outside-click';

const Navbar: React.FC<INavbarProps> = ({
  routerLink = '/home',
  showArrow = true,
  showHamburger = true,
}) => {
  const { logout } = useAuth();
  const {menuOpen, setMenuOpen, closeMenu} = useHamburgerMenu();
  const hamburgerMenuRef = useOutsideClick(closeMenu)
  return (
    <div className="bg-violet-brand p-4 px-8 w-full flex flex-col h-18 relative">
      <div className="w-full grid grid-rows-1 grid-col-3 place-items-center">
        <div className="flex w-full justify-between col-start-1 col-end-4 row-start-1 row-end-2">
          <div className="flex justify-center items-center">
            {showArrow && (
              <Link to={routerLink}>
                <img
                  src="src/assets/images/back-arrow.svg"
                  alt="Volver"
                  className="object-cover rounded w-4 h-auto"
                />
              </Link>
            )}
          </div>
          <div className="flex flex-col justify-center z-20" ref={hamburgerMenuRef}>
            {showHamburger && (
              <div
                className="flex justify-center cursor-pointer transform transition-transform hover:scale-110"
                onClick={() => {setMenuOpen(!menuOpen)}}
              >
                {!menuOpen ? (
                  <img
                    src="/src/assets/icon/menu.svg"
                    alt="User profile"
                    className="object-cover rounded w-6 h-6"
                  />
                ) : (
                  <img
                    src="/src/assets/icon/close.svg"
                    alt="User profile"
                    className="object-cover rounded w-6 h-6"
                  />
                )}
              </div>
            )}

            {menuOpen && (
              <div className="absolute bg-white md:right-6 right-0 top-20 rounded-xl px-1 shadow-2xl">
                <div className="absolute top-[-15px] right-16 md:right-10 w-0 h-0">
                  <svg width="50" height="20">
                    <polygon points="25,0 0,50 50,50" fill="white" />
                  </svg>
                </div>
                <div className="w-full text-left py-4 px-8 pt-6 border-b-2 border-gray-100 font-bold text-xl text-violet-brand">
                  <span>Javier</span>
                </div>
                <div className="flex flex-col px-8 py-8 gap-y-6 items-start text-left text-lg text-[#363F45]">
                  {/* El gris pactado no se parece al de figma */}
                  <Link
                    to="/profile"
                    className="transform transition-transform hover:scale-105"
                    onClick={closeMenu}
                  >
                    Mi cuenta
                  </Link>
                  <Link
                    to="/upload-certificate"
                    className="transform transition-transform hover:scale-105"
                    onClick={closeMenu}
                  >
                    Cargar resultados de mesa
                  </Link>
                  <Link
                    to="/home"
                    className="transform transition-transform hover:scale-105"
                    onClick={() => {alert('No existe la ruta aún'); closeMenu()}}
                  >
                    Impugnar mesa
                  </Link>
                  <Link
                    to="/home"
                    className="transform transition-transform hover:scale-105"
                    onClick={() => {alert('No existe la ruta aún'); closeMenu()}}
                  >
                    Denunciar Irregularidades
                  </Link>
                  <Link
                    to="/total-results"
                    className="transform transition-transform hover:scale-105"
                    onClick={closeMenu}
                  >
                    Ver resultados
                  </Link>
                </div>
                <div className="flex w-full text-left py-7 white px-8 border-t-2 border-gray-100 ">
                  <div className="flex gap-2 transform transition-transform hover:scale-105">
                    <img
                      src="/src/assets/icon/log-out.svg"
                      alt="User profile"
                      className="object-cover rounded text-violet-brand"
                    />
                    <Button
                      onClick={() => {logout(); closeMenu()}}
                      label="Cerrar sesión"
                      type="button"
                      className=""
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex col-start-2 col-end-3 row-start-1 row-end-2">
          <Link to='/home' className="flex-shrink-0 ml-auto">
            <img
              src="src/assets/logos/fenix-new.svg"
              alt="Logo"
              className="object-cover rounded w-12 h-12 cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
