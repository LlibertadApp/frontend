import { FC } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import Button from '#/components/button';
import Navbar from '#/components/navbar';
import { ISendSuccessProps } from './types';

import './styles.css';
import { paths } from '#/routes/paths';

const SendSuccessPage: FC<ISendSuccessProps> = ({ message }) => {
  return (
    <section className="items-center flex flex-col ">
      <Navbar routerLink={paths.loadInformation} showArrow={false} />
      <div className="p-4 w-full">
        <div className="container mx-auto">
          <div className="flex items-center justify-center my-20 ">
            <img
              src="assets/icon/success.svg"
              alt="data sent successful"
              className="object-cover rounded w-68 h-auto lg:w-[25.5rem]"
            />
          </div>
          <div className="flex items-center justify-center py-4">
            <h3 className="successfull lg:!text-[40px]">
              {message ?? 'Datos enviados con éxito'}
            </h3>
          </div>
          <h3 className="flex text-center text-base justify-center lg:text-2xl lg:mt-[14px]">
            Muchas gracias por fiscalizar!
          </h3>
          <div className="flex items-center justify-center my-20">
            {/* TODO: Mover a Home */}
            <Link to={paths.home} className="w-full">
              <Button
                className="bg-violet-brand p-4 text-white rounded-xl w-full cursor-default lg:max-w-sm lg:m-auto"
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

export const SendSuccess = observer(SendSuccessPage);

export default SendSuccess;
