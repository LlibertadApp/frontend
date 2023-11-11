import { FC } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import Button from '#/components/button';
import Navbar from '#/components/navbar';
import { ISendWarningProps } from './types';

import './styles.css';
import { paths } from '#/routes/paths';

const SendWarningPage: FC<ISendWarningProps> = ({ message }) => {
  return (
    <section className="items-center flex flex-col ">
      <Navbar routerLink={paths.loadInformation} showArrow={false} />
      <div className="p-4 w-full">
        <div className="container mx-auto">
          <div className="flex items-center justify-center my-10">
            <img
              src="assets/icon/success.svg"
              alt="success icon"
              className="w-64 h-auto lg:w-[25.5rem]"
            />
          </div>
          <div className="flex items-center justify-center py-3">
            <h3 className="successfull text-xl lg:!text-[40px]">
              {message ?? 'Datos enviados con éxito'}
            </h3>
          </div>
          <h3 className="flex text-center text-sm justify-center lg:text-2xl lg:mt-[14px] mb-10">
            Muchas gracias por fiscalizar, ¡VLLC!
          </h3>
          <div className="flex items-center justify-center py-2 px-4 border border-red-error rounded-lg gap-2 lg:max-w-[408px] lg:mx-auto">
            <img
              src="assets/icon/alert-icon.svg"
              alt="warning icon"
              className="w-6 h-6"
            />
            <h4 className="flex text-left text-xs justify-center lg:text-sm  leading-[18px]">
              Los datos enviados tienen diferencias.
              ¿Desea denunciar esta mesa?
            </h4>
          </div>
          <div className="flex items-center justify-center my-10 gap-2 lg:max-w-[408px] lg:mx-auto lg:gap-5">
            <Link to={paths.deskList} className="w-full">
              <Button
                appearance="filled"
                className="!bg-red !p-4 rounded-xl w-full cursor-default lg:max-w-sm lg:m-auto h-14"
                type="submit"
                label="Denunciar"
              />
            </Link>
            <Link to={paths.home} className="w-full">
              <Button
                className="bg-violet-primary !p-4 text-white rounded-xl w-full cursor-default lg:max-w-sm lg:m-auto h-14"
                type="submit"
                label="Volver a inicio"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export const SendWarning = observer(SendWarningPage);

export default SendWarning;
