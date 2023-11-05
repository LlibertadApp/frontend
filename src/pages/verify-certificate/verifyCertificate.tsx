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
import { useActivatedRoutes } from '#/context/ActivatedRoutesContext';

const VerifyCertificate = () => {
  const [correctData, setCorrectData] = useState<boolean>(false);
  const [imageUploaded, setImageUploaded] = useState<boolean>(false);
  const [errorAlert, setErrorAlert] = useState<string | null>(null);
  const { certificateImage } = useCertificate();

  const { setActiveRoute } = useActivatedRoutes();

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

      <div className="w-full text-center max-w-3xl">
        <div className="container mx-auto flex-column my-210">
          <div className="flex justify-center mt-4 px-4">
            <ProgressIndicator
              steps={[
                ProgressStepStatus.Successful,
                ProgressStepStatus.Active,
                ProgressStepStatus.Pending,
              ]}
            />
          </div>

          <div className="py-4 text-center my-[14px] mx-6 text-xl font-semibold text-text-off">
            <span>Carga el certificado del fiscal</span>
          </div>
          <div className="p-4 text-left text-text-off mx-2">
            <span>
              Chequeá que la imagen se vea <b>nítida</b> y completa antes de
              subirla.
            </span>
          </div>

          <div className="flex items-center justify-center px-4 py-4">
            <img
              src={certificateImage || ''}
              alt="data sent successful"
              className="object-cover rounded w-100 h-auto"
            />
          </div>

          <div className="flex items-center justify-center text-sm my-6">
            <div className="flex items-center px-4">
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
                    className="before:content[''] peer relative h-6 w-6 cursor-pointer appearance-none rounded-md border-2 border-violet-brand transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-violet-brand checked:bg-violet-brand checked:before:bg-violet-500 hover:before:opacity-10"
                  />
                  <div className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <img src="assets/icon/check-icon.svg" alt="check" />
                  </div>
                </label>
              </div>
              <div className="pl-2 pr-4">
                <h3
                  className="text-start text-sm cursor-pointer text-text-off"
                  onClick={handleCheckbox}
                >
                  Verifico que la imagen está firmada por el presidente de mesa
                  y fue completado por mí previamente.
                </h3>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full p-4">
            {!correctData ? (
              <div className="flex w-full justify-center">
                <Button
                  className="w-full p-3 text-[18px] font-light tracking-wider text-text-off bg-gray-300 rounded-xl max-w-sm cursor-default"
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
                  className="w-full p-3 text-[18px] font-light tracking-wider text-white bg-violet-brand rounded-xl max-w-sm"
                  type="button"
                  label="Continuar"
                  onClick={() => setActiveRoute(true)}
                />
              </Link>
            )}
            <Link
              to={paths.uploadCertificate}
              className="flex w-full justify-center"
            >
              <Button
                className="w-full p-3 text-[18px] font-light tracking-wider border-2 border-violet-brand text-violet-brand hover:border-violet-light mt-4 rounded-xl max-w-sm"
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
