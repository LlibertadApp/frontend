import { Link } from 'react-router-dom';
import Navbar from '#/components/navbar';
import Button from '#/components/button';
import { paths } from '#/routes/paths';

const UploadFailedPage = () => {
    return (
        <section className='items-center flex flex-col'>
            <Navbar routerLink={paths.loadInformation} />
            <div className="p-4 w-full lg:max-w-[52.5rem]">
                <div className="container mx-auto">
                    <div className="flex items-center justify-center my-[60px]">
                        <img
                            src="assets/icon/failed.svg"
                            alt="data sent successful"
                            className="object-cover rounded w-68 h-auto lg:w-[25.5rem]"
                        />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <h3 className="text-xl font-medium lg:!text-[40px] lg:mb-5">
                            El envío de los datos falló
                        </h3>
                    </div>
                    <p className="flex text-center text-[0.95rem] leading-6 justify-center p-4 lg:text-2xl lg:mt-[14px] lg:p-0">
                        Lo sentimos, no fue posible completar la acción en este momento. Por favor vuelve a intentarlo.
                    </p>
                    <div className="flex items-center justify-center my-10">
                        <Link to={paths.loadInformation} className='w-full'>
                            <Button
                                className="bg-violet-brand p-4 text-white rounded-xl tracking-wider w-full cursor-default lg:max-w-sm lg:m-auto"
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

export const UploadFailed = (UploadFailedPage);
export default UploadFailed;
