import React from 'react';
import { OverlayProps } from './types';
import { useHamburgerMenu } from '#/context/HamburgerContext';

const Overlay: React.FC<OverlayProps> = ({ children }) => {
  const { menuOpen } = useHamburgerMenu();
  return (
    <section>
      {menuOpen && (
        <div className="w-full h-full top-0 bottom-0 absolute backdrop-blur-[2px] bg-[#201B2B4D] z-10"></div>
      )}
      {children}
    </section>
  );
};

export default Overlay;
