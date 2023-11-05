import { useState, useEffect } from 'react';
import ImageInput from '#/components/imageInput';
import { getBase64 } from '#/utils';
import { useNavigate } from 'react-router-dom';
import { paths } from '#/routes/paths';
import toast from 'react-hot-toast';
import { useActivatedRoutes } from '#/context/ActivatedRoutesContext';

const CheckItem = ({ text }: { text: string }) => (
  <div className="flex justify-space-around items-center md:text-xl text-sm gap-2 text-[#444444]">
    <img className="w-5 h-5" src="assets/icon/checkcircle.svg" alt="" />
    <p className="px-full">{text}</p>
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
  const { setActiveRoute } = useActivatedRoutes();

  async function onUploadInternal(file: File | null | undefined) {
    if (!file) return;
    const base64 = await getBase64(file);
    onUpload(base64);
    handlePreview(file);
    setUploaded(true);
    setActiveRoute(true);
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
        toast.error(
          'Hubo un error al cargar la página porfavor refresqué la misma.',
          {
            icon: '⛔',
          },
        );
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
        <div className="flex flex-col gap-4 w-full pt-[22px]">
          <CheckItem text="Buscá un lugar con buena luz." />
          <CheckItem text="Asegurate de que se vean todos los datos." />
          <CheckItem text="Asegurate que el certificado esté firmado por el presidente de tu mesa." />
        </div>
        <div className="flex items-center justify-center w-full overflow-hidden">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center cursor-pointer mt-[30px] mb-10"
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
      </div>
      <div className="flex items-center w-full text-center">
        <label
          htmlFor="open-camera"
          className="bg-violet-brand p-4 text-white rounded-xl font-semibold text-xl tracking-wider w-full cursor-pointer"
        >
          <ImageInput
            id="open-camera"
            handleOnChange={(ev) => onUploadInternal(ev.target.files?.[0])}
          />
          <p className="mx-auto font-light">Cargar Imagen</p>
        </label>
      </div>
    </div>
  );
}

export default UploadImage;
