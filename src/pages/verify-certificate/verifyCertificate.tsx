
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '#/components/button';
import ProgressIndicator from '#/components/progressIndicator';
import Navbar from '#/components/navbar';
import { useCertificate } from '#/context/CertificationContext';
import { ProgressStepStatus } from '#/components/progressIndicator/types';
import './styles.css';
import { paths } from '#/routes/paths';
import Checkbox from '#/components/checkbox/checkbox';

function VerifyCertificate() {
  const navigate = useNavigate();
  const [correctData, setCorrectData] = useState<boolean>(false);
  const { certificateImage, setFile, setCertificateImage,completedForm } = useCertificate();

  useEffect(() => {
    if(completedForm){
      navigate(paths.uploadCertificate)
    }
  }, [])

  const handleContinue = () => {
    if (!correctData) return;
    navigate(paths.loadInformation);
  }

  const handleImageReupload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0]!);
    // setCertificateImage(URL.createObjectURL(e.target.files?.[0]!));
    setCertificateImage(e.target.files?.[0]!);

    navigate(paths.verifyCertificate);
  }

  const handleCheckbox = () => {
    setCorrectData((correctData) => !correctData);
  };

  return (
    <>
      <Navbar routerLink={paths.home} />
      <main className='container mx-auto p-4 flex flex-col gap-[30px] max-w-[52.5rem]'>
        <ProgressIndicator
          steps={[
            ProgressStepStatus.Successful,
            ProgressStepStatus.Active,
            ProgressStepStatus.Pending,
          ]}
        />
        <h1 className="text-neutral-700 text-xl font-medium text-center">Cargar el certificado del fiscal</h1>
        <p className="text-neutral-600 text-base">Chequeá que la imagen se vea nítida y completa antes de subirla</p>
        {certificateImage && (
          <img src={URL.createObjectURL(certificateImage)} alt="uploaded image" className="object-cover rounded-2xl w-100 h-auto border-2" />
        )}
        <Checkbox
          label="Verifico que la imagen está firmada por el presidente de mesa y fue completado por mí previamente."
          checked={correctData}
          onChange={handleCheckbox} />
        <section className='flex flex-col gap-4'>
          <Button disabled={!correctData} type="button" onClick={handleContinue}>Continuar</Button>
          <Link to={paths.uploadCertificate} className="w-full">
            <Button
              appearance='outlined'
              label="Volver a cargar imagen"
            />
          </Link>
        </section>
      </main>
    </>
  );
};

export const VerifyCertificatePage = (VerifyCertificate);
export default VerifyCertificatePage;
