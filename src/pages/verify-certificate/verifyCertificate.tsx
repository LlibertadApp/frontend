import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useState } from 'react';
import Button from '#/components/button';
import ProgressIndicator from '#/components/progressIndicator';
import Navbar from '#/components/navbar';

import { ProgressStepStatus } from '#/components/progressIndicator/types';
import './styles.css';

const VerifyCertificate = () => {
  const [correctData, setCorrectData] = useState<boolean>(false);
  const handleCheckbox = () => {
    setCorrectData((correctData) => !correctData);
  };

  return (
    <section className="items-center flex flex-col justify-center text-center">
      <Navbar routerLink="/upload-certificate" />
      <div className="w-full text-center">
        <div className="container mx-auto flex-column my-210">
          <ProgressIndicator
            steps={[
              ProgressStepStatus.Successful,
              ProgressStepStatus.Active,
              ProgressStepStatus.Pending,
            ]}
          />

          <div className="p-4 text-center my-2 mx-12 text-xl font-bold">
            <span>Cargá el certificado del fiscal.</span>
            {/* TODO: Pensar los espaciados y quizá el width de la img */}
          </div>
          <div className="p-4 text-center mx-12 text-base">
            <span>
              Chequeá que la imagen se vea nítida y completa antes de subirla.
            </span>
          </div>

          <div className="flex items-center justify-center my-2">
            <img
              src="src/assets/images/certfFiscal-test.png"
              alt="data sent successful"
              className="object-cover rounded w-100 h-auto"
            />
          </div>

          <div className="flex items-center justify-center text-sm my-10">
            <div className="flex items-center px-12">
              <div className="inline-flex items-center">
                <label
                  className="relative flex items-center p-3 rounded-full cursor-pointer"
                  data-ripple-dark="true"
                >
                  <input
                    id="login"
                    type="checkbox"
                    checked={correctData}
                    onChange={handleCheckbox}
                    className="before:content[''] peer relative h-7 w-7 cursor-pointer appearance-none rounded-md border-2 border-violet-brand transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-violet-brand checked:bg-violet-brand checked:before:bg-violet-500 hover:before:opacity-10"
                  />
                  <div className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <img src="src/assets/icon/check-icon.svg" alt="check" />
                  </div>
                </label>
              </div>
              <div className="px-3">
                <h3 className="text-start text-base cursor-pointer" onClick={handleCheckbox}>
                  Verifico que la imagen está firmada por
                  el presidente de mesa y fue completado por mí previamente.
                </h3>
              </div>
            </div>
          </div>
          {/* TODO: Agregar lógica de documento a los botones*/}
          {/* TODO: Agregar lógica de documento al reintentar */}
          <div className="flex flex-col items-center justify-center w-full p-4">
            {/* TODO: Mover a Dashboard */}
            <Link to="/load-information" className="flex w-full">
              <Button
                className="w-full p-4 text-xl font-semibold tracking-wider text-white bg-violet-brand rounded-xl"
                type="button"
                label="Enviar imagen"
              />
            </Link>
            <Button
              className="w-full p-3 text-xl font-semibold tracking-wider border-2 border-violet-brand text-violet-brand hover:border-violet-light mt-4 rounded-xl"
              type="submit"
              label="Reintentar"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export const VerifyCertificatePage = observer(VerifyCertificate);

export default VerifyCertificatePage;
