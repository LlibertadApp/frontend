import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import Navbar from '#/components/navbar';
import Button from '#/components/button';
import { paths } from '#/routes/paths';

const UploadFailedPage = () => {
    return (
        <section className='items-center flex flex-col'>
            <Navbar routerLink={paths.loadInformation} />
            <div className="p-4 w-full">
                <div className="container mx-auto">
                    <div className="flex items-center justify-center my-20 ">
                        <img
                            src="assets/icon/failed.svg"
                            alt="data sent successful"
                            className="object-cover rounded w-68 h-auto"
                        />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <h3 className="text-xl font-medium">
                            El envío de los datos falló
                        </h3>
                    </div>
                    <p className="flex text-center text-[0.95rem] leading-6 justify-center p-4">
                        Lo sentimos, no fue posible completar la acción en este momento. Por favor vuelve a intentarlo.
                    </p>
                    <div className="flex items-center justify-center my-10">
                        <Link to={paths.loadInformation} className='w-full'>
                            <Button
                                className="bg-violet-brand p-4 text-white rounded-xl tracking-wider w-full cursor-default"
                                type="submit"
                                label="Reintentar"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const UploadFailed = observer(UploadFailedPage);
export default UploadFailed;
