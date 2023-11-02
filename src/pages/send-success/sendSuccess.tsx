import { FC } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import Button from '#/components/button';
import Navbar from '#/components/navbar';
import { ISendSuccessProps } from './types';

import './styles.css';

const SendSuccessPage: FC<ISendSuccessProps> = ({ message }) => {
  return (
    <section className="items-center flex flex-col ">
      <Navbar routerLink="/load-information" />
      <div className="p-4 w-full">
        <div className="container mx-auto">
          <div className="flex items-center justify-center my-20 ">
            <img
              src="assets/icon/success.svg"
              alt="data sent successful"
              className="object-cover rounded w-68 h-auto"
            />
          </div>
          <div className="flex items-center justify-center py-4">
            <h3 className="successfull">
              {message ?? 'Datos enviados con éxito'}
            </h3>
          </div>
          <h3 className="flex text-start text-base justify-center">
            Muchas gracias por fiscalizar, ¡VLLC!
          </h3>
          <div className="flex items-center justify-center my-20">
            {/* TODO: Mover a Home */}
            <Link to="/home" className='w-full'>
              <Button
                className="bg-violet-brand p-4 text-white rounded-xl font-light text-xl tracking-wider w-full cursor-default"
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
