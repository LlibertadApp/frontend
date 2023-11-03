import { useState, useEffect } from 'react';
import ImageInput from '#/components/imageInput';
import { getBase64 } from '#/utils';
import Button from '#/components/button';
import { Link, useNavigate } from 'react-router-dom';
import { paths } from '#/routes/paths';
 import toast, { Toaster } from 'react-hot-toast';

const CheckItem = ({ text }: { text: string }) => (
  <div className="flex justify-space-around items-center md:text-xl text-sm gap-2 h-12">
    <div className="flex justify-center items-center rounded-full bg-green-check text-white w-5 h-5 flex-shrink-0">
      <img className="w-3 h-3" src="assets/icon/check-icon.svg" alt="" />
    </div>
    <p className="px-full mx-2">{text}</p>
  </div>
);

export function UploadImage({
  onUpload,
}: {
  onUpload: (image: string) => void;
}) {
  const [preview, setPreview] = useState<string>();
  const [uploaded, setUploaded] = useState(false);
  const navigate = useNavigate();

  async function onUploadInternal(file: File | null | undefined) {
    if (!file) return;
    const base64 = await getBase64(file);
    onUpload(base64);
    handlePreview(file);
    setUploaded(true);
  }

  function handlePreview(file: File) {
    const objectUrl: string = URL.createObjectURL(file);
    setPreview(objectUrl);
  }

  //Funcion para volver a cargar una imagen
  const reuploadImage = () => {
    setPreview(undefined);
    setUploaded(false);
  };
  /* No estoy totalmente seguro de qué esto sea optimo, 
  pero el useEffect se activa cuando uploaded cambia, 
  lo que solo va a ocurrir una vez,
  después de que el usuario ha subido una imagen */
  useEffect(() => {
    if (uploaded) {
      try {
        navigate(paths.verifyCertificate);
      } catch (error) {
        toast.error('Hubo un error al navegar a la página de verificación', {
          icon: '⛔',
        });
      }
    }
  }, [uploaded, navigate]);
  return (
    <div className="flex flex-col items-center text-lg">
      <div
        className="flex flex-col items-center text-lg"
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.items[0].getAsFile();
          onUploadInternal(file);
        }}
      >
        <div className="flex items-center justify-center w-full overflow-hidden">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full rounded-lg cursor-pointer my-6"
          >
            <div className="flex flex-col items-center justify-center">
              <img src={preview || 'assets/icon/upload-box.svg'} alt="" />
            </div>
            <ImageInput
              id="dropzone-file"
              handleOnChange={(ev) => onUploadInternal(ev.target.files?.[0])}
            />
          </label>
        </div>
        <div className="flex flex-col gap-4 w-full px-12 mb-10">
          <CheckItem text="Buscá un lugar con buena luz." />
          <CheckItem text="Asegurate de que se vean todos los datos." />
          <CheckItem
            text="Asegurate que esté firmado por el presidente de
                  tu mesa."
          />
        </div>
      </div>
      <div className="flex items-center w-full text-center">
        <label
          htmlFor="open-camera"
          className="bg-violet-brand p-4 text-white rounded-xl font-semibold text-xl tracking-wider w-full cursor-default"
        >
          <ImageInput
            id="open-camera"
            handleOnChange={(ev) => onUploadInternal(ev.target.files?.[0])}
          />
          <p className="mx-auto">Tomar foto</p>
          <Toaster position="top-right" reverseOrder={false} />
        </label>
      </div>
    </div>
  );
}

export default UploadImage;
