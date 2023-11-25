import { useState, useEffect } from 'react';
import { useMediaQuery } from '@react-hook/media-query';
import ImageInput from '#/components/imageInput';
import Button from '#/components/button';
import { useNavigate } from 'react-router-dom';
import { paths } from '#/routes/paths';
import toast from 'react-hot-toast';
import { useCertificate } from '#/context/CertificationContext';

const CheckItem = ({ text }: { text: string }) => (
    <div className="flex justify-space-around items-center md:text-lg text-xs gap-2 text-[#444444]">
        <img className="w-5 h-5" src="/assets/icon/checkcircle.svg" alt="CheckCircle" />
        <p className="px-full">{text}</p>
    </div>
);

export function UploadImage({ onUpload }: { onUpload: (image: File) => void }) {
    const [preview, setPreview] = useState<string>();
    const [uploaded, setUploaded] = useState(false);
    const navigate = useNavigate();
    const { setCertificateImage } = useCertificate();

    async function onUploadInternal(file: File | null | undefined) {
        if (!file) return;
        onUpload(file);
        await handlePreview(file);
        setUploaded(true);
        setCertificateImage(file);
    }

    async function handlePreview(file: File) {
        const objectUrl: string = URL.createObjectURL(file);
        setPreview(objectUrl);
    }

    useEffect(() => {
        if (uploaded) {
            try {
                console.log(uploaded);
                navigate(paths.verifyActa);
            } catch (error) {
                toast.error('Hubo un error al cargar la página porfavor refresqué la misma.', {
                    icon: '⛔',
                });
            }
        }
    }, [uploaded, navigate]);

    const isDesktop = useMediaQuery('(min-width: 1024px)');

    const previewSrc = isDesktop ? '/assets/icon/upload-box-desktop.svg' : '/assets/icon/upload-box.svg';

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
                <div className="flex flex-col gap-4 w-full pt-[22px] lg:py-[3.75rem]">
                    <CheckItem text="Buscá un lugar con buena luz." />
                    <CheckItem text="Asegurate de que se vean todos los datos." />
                    <CheckItem text="Asegurate que el certificado esté firmado por el presidente de tu mesa." />
                </div>
                <div className="flex items-center justify-center w-full overflow-hidden">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center cursor-pointer mt-[30px] mb-10">
                        <div className="flex flex-col items-center justify-center">
                            <img src={preview || previewSrc} alt="UploadBox" />
                        </div>
                        <ImageInput id="dropzone-file" handleOnChange={(ev) => onUploadInternal(ev.target.files?.[0])} />
                    </label>
                </div>
            </div>
            <div className="flex items-center w-full text-center lg:justify-center">
                <Button type="submit" appearance="filled" className="lg:max-w-sm">
                    <label htmlFor="open-camera">
                        <ImageInput id="open-camera" handleOnChange={(ev) => onUploadInternal(ev.target.files?.[0])} />
                        Cargar Imagen
                    </label>
                </Button>
            </div>
        </div>
    );
}

export default UploadImage;
