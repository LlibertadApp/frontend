import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useState } from 'react';
import Button from '#/components/button';
import ProgressIndicator from '#/components/progressIndicator';
import Navbar from '#/components/navbar';
import { useCertificate } from '#/context/CertificationContext';
import { ProgressStepStatus } from '#/components/progressIndicator/types';
import './styles.css';
import { paths } from '#/routes/paths';

const VerifyCertificate = () => {
  const [correctData, setCorrectData] = useState<boolean>(false);
  const [imageUploaded, setImageUploaded] = useState<boolean>(false);
  const [errorAlert, setErrorAlert] = useState<string | null>(null);
  const { certificateImageBase64 } = useCertificate();

  const handleCheckbox = () => {
    setCorrectData((correctData) => !correctData);
  };

  const handleImageUpload = () => {
    //Verificacion de checkbox si no ha firmado
    if (correctData) {
      setErrorAlert('Verica que has firmado');
    }

    //estados de alerta y de imagen cargada
    setImageUploaded(imageUploaded);
    setErrorAlert(null);
  };

  const handleReset = () => {
    correctData ? handleCheckbox() : null;
  };

  return (
    <section className="items-center flex flex-col justify-center text-center">
      <Navbar routerLink={paths.uploadCertificate} />

      <div className="w-full text-center max-w-[52.5rem]">
        <div className="container mx-auto flex-column">
          <div className="flex justify-center mt-4 px-4 lg:px-0">
            <ProgressIndicator
              steps={[
                ProgressStepStatus.Successful,
                ProgressStepStatus.Active,
                ProgressStepStatus.Pending,
              ]}
            />
          </div>

          <div className="py-4 text-center my-[14px] mx-6 text-xl font-semibold text-text-off lg:text-[2.5rem] lg:py-[3.75rem]">
            <span>Carga el certificado del fiscal</span>
          </div>
          <div className="p-4 text-left text-text-off mx-2 lg:p-0 lg:mb-[50px] lg:text-xl">
            <span>
              Chequeá que la imagen se vea <b>nítida</b> y completa antes de
              subirla.
            </span>
          </div>

          {certificateImageBase64 ? (
            <>
              <div className="flex items-center justify-center px-4 py-4">
                <img
                  src={certificateImageBase64 || ''}
                  alt="uploaded image"
                  className="object-cover rounded-2xl w-100 h-auto"
                />
              </div>

              <div className="flex items-center justify-center text-sm mt-[14px] mb-8">
                <div className="flex items-start px-4 gap-2">
                  <div className="inline-flex items-center pl-3 pt-[2px]">
                    <label
                      className="relative flex items-center rounded-full cursor-pointer"
                      data-ripple-dark="true"
                    >
                      <input
                        id="login"
                        type="checkbox"
                        checked={correctData}
                        onChange={handleCheckbox}
                        className="before:content[''] peer relative h-6 w-6 cursor-pointer appearance-none rounded-md border-2 border-violet-primary transition-all before:absolute before:top-2/4 before:left-2/4 before:block 
                        before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 
                        before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity 
                        hover:before:opacity-10 checked:border-violet-primary checked:bg-violet-primary lg:mt-[0.5px]"
                      />
                      <div className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                        <img src="assets/icon/check-icon.svg" alt="check" />
                      </div>
                    </label>
                  </div>
                  <div className="pl-2 pr-4">
                    <h3
                      className="text-start text-sm cursor-pointer text-text-off lg:text-lg"
                      onClick={handleCheckbox}
                    >
                      Verifico que la imagen está firmada por el presidente de
                      mesa y fue completado por mí previamente.
                    </h3>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="px-4 py-16 m-4 text-red-error bg-red-error/10 rounded-xl">
              Hubo un error al recuperar la foto, por favor, volvé a cargar la
              imagen.
            </div>
          )}

          <div className="flex flex-col items-center justify-center w-full px-4 py-5">
            {!correctData ? (
              <div className="flex w-full justify-center">
                <Button
                  className="w-full p-3 font-light tracking-wider text-text-off bg-gray-300 rounded-xl max-w-sm cursor-default"
                  appearance='disabled'
                  type="button"
                  label="Continuar"
                />
              </div>
            ) : (
              <Link
                to={paths.loadInformation}
                className="flex w-full justify-center"
              >
                <Button
                  className="w-full p-3 font-light tracking-wider text-white bg-violet-brand rounded-xl max-w-sm"
                  type="button"
                  label="Continuar"
                />
              </Link>
            )}
            <Link
              to={paths.uploadCertificate}
              className="flex w-full justify-center"
            >
              <Button
                className="tracking-wider border-2 mt-4 max-w-sm"
                appearance='outlined'
                type="submit"
                label="Volver a cargar imagen"
                disabled={imageUploaded}
                onClick={handleReset}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export const VerifyCertificatePage = observer(VerifyCertificate);

export default VerifyCertificatePage;
