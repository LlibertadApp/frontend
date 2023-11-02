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
                    <div className="flex items-center justify-center py-4">
                        <h3 className="text-xl font-medium">
                        El envío de los datos falló
                        </h3>
                    </div>
                    <h3 className="flex text-start text-base justify-center">
                        Lo sentimos, no pudimos enviar los datos
                    </h3>
                    <div className="flex items-center justify-center my-20">
                        <Link to={paths.loadInformation} className='w-full'>
                            <Button
                                className="bg-violet-brand p-4 text-white rounded-xl font-light text-xl tracking-wider w-full cursor-default"
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
