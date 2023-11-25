import { FC } from 'react';
import { Link } from 'react-router-dom';
import Button from '#/components/button';
import Navbar from '#/components/navbar';
import { ISendSuccessProps } from './types';

import { paths } from '#/routes/paths';
import { useTranslation } from 'react-i18next';

const SendSuccess: FC<ISendSuccessProps> = ({ message }) => {
    const { t } = useTranslation('sendSuccess');
    return (
      <section className="items-center flex flex-col ">
      <Navbar routerLink={paths.loadActaInfo} showArrow={false} />
      <div className="p-4 w-full">
        <div className="container mx-auto">
          <div className="flex items-center justify-center my-20 ">
            <img
              src="/assets/icon/success.svg"
              alt="data sent successful"
              className="object-cover rounded w-68 h-auto lg:w-[25.5rem]"
            />
          </div>
          <div className="flex items-center justify-center py-4">
            <h3 className="text-[144%] font-semibold text-gray-darker  lg:!text-[40px]">{message ?? t('data_sent_successfully')} </h3>
          </div>
          <h3 className="flex text-center text-base justify-center lg:text-2xl lg:mt-[14px]">{t('thank_you_for_monitoring')}          </h3>
          <div className="flex items-center justify-center my-20">
            <Link to={paths.home} className="w-full">
              <Button
                className="bg-violet-brand p-4 text-white rounded-xl w-full cursor-default lg:max-w-sm lg:m-auto"
                type="submit"
                label={t('return_to_home')}
                />
                </Link>
              </div>
            </div>
          </div>
        </section>
    );
    }
export default SendSuccess;
