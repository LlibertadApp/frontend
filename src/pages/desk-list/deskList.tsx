import { FC, useEffect, useState } from 'react';

import { paths } from '#/routes/paths';
import Navbar from '#/components/navbar';
import Acta from '#/interfaces/acta.interface';
import TableList from '#/components/tableList';
import { getUserActas } from '#service/api/actas';
import LoadingSpinner from '#/components/loadingSpinner';
import { useTranslation } from 'react-i18next';

const DeskList: FC = () => {
    const { t } = useTranslation('deskList');
    const [isLoading, setIsLoading] = useState(false);
    const [actas, setActas] = useState<Acta[]>([]);

    useEffect(() => {
        setIsLoading(true);
        getUserActas()
            .then((actas) => {
                setActas(actas);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <>
            <Navbar routerLink={paths.home} showArrow={true} />
            <main className="flex flex-col items-center px-4 py-8 max-w-4xl gap-8 m-auto">
                <h1 className="text-violet-brand text-3xl font-semibold text-center">{t('title')}</h1>
                {!isLoading ? <TableList actas={actas} /> : <LoadingSpinner className="!fill-violet-brand mt-8 !w-12 !h-12" />}
            </main>
        </>
    );
};

export default DeskList;
