import React from 'react';
import { Link } from 'react-router-dom';
import Button from '#/components/button';
import Navbar from '#/components/navbar';
import { paths } from '#/routes/paths';
import Overlay from '#/components/overlay';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';



const DeskList = () => {


    const DummyData = {
        desks: [
            {
                id: 1,
                name: "Mesa 484",
                description: "",
                status: {
                    normal: true,
                },
                votes: 40,
                envelopes: '240',
                circuit: '635',
                electors: '240',
                candidate1: {
                    name: 'Javier Gerardo Milei',
                    votes: '190',
                },
                candidate2: {
                    name: 'Sergio Tomás Massa',
                    votes: '315'
                },
                nullVotes: '0',
                recurredVotes: '0',
                impugnedVotes: '0',
                commandVotes: '0',
                blankVotes: '0',
                totalVotes: '240',
            },

            {
                id: 2,
                name: "Mesa 777",
                description: "",
                status: {
                    warning: 'Irregular',
                },
                votes: 40,
                envelopes: '240',
                circuit: '635',
                electors: '240',
                candidate1: {
                    name: 'Javier Gerardo Milei',
                    votes: '190',
                },
                candidate2: {
                    name: 'Sergio Tomás Massa',
                    votes: '315'
                },
                nullVotes: '0',
                recurredVotes: '0',
                impugnedVotes: '0',
                commandVotes: '0',
                blankVotes: '0',
                totalVotes: '240',
            },

        ]
    }

    const DropIcon = () => {
        return (
            <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.021 1.80235L6.86479 6.9586C6.8169 7.00654 6.76003 7.04457 6.69743 7.07052C6.63484 7.09647 6.56774 7.10982 6.49998 7.10982C6.43222 7.10982 6.36512 7.09647 6.30253 7.07052C6.23993 7.04457 6.18306 7.00654 6.13518 6.9586L0.978927 1.80235C0.882175 1.7056 0.82782 1.57437 0.82782 1.43754C0.82782 1.30071 0.882175 1.16949 0.978927 1.07274C1.07568 0.975985 1.2069 0.921631 1.34373 0.921631C1.48056 0.921631 1.61178 0.975985 1.70854 1.07274L6.49998 5.86483L11.2914 1.07274C11.3393 1.02483 11.3962 0.986829 11.4588 0.960902C11.5214 0.934975 11.5885 0.921631 11.6562 0.921631C11.724 0.921631 11.7911 0.934975 11.8537 0.960902C11.9163 0.986829 11.9731 1.02483 12.021 1.07274C12.0689 1.12064 12.1069 1.17752 12.1329 1.24011C12.1588 1.3027 12.1721 1.36979 12.1721 1.43754C12.1721 1.50529 12.1588 1.57238 12.1329 1.63497C12.1069 1.69757 12.0689 1.75444 12.021 1.80235Z" fill="#1D1A28" />
            </svg>

        )
    }


    return (
        <main>
            <Overlay>
                <Navbar routerLink={paths.home} showArrow={true} />
                <section className="flex p-4 justify-center">
                    <div className='pt-8'>
                        {/* No hay datos, no hay mesas para mostrar */}
                        <span className="text-violet-brand text-4xl font-black pt-4 p-4 start">
                            MESAS CARGADAS
                        </span>
                        <div className='pb-4 py-4'>
                            <span className='text-l'>
                                Tus mesas cargadas
                            </span>
                        </div>
                        {DummyData.desks.length === 0 ? (
                            <p>No hay mesas cargadas</p>
                        ) : (
                            <div className='py-4 justify-center'>
                                {DummyData.desks.map(desk => (
                                    <Accordion key={desk.id}
                                        style={{ border: '1px linear #ccc', marginBottom: '1rem', borderRadius: '8px' }}
                                    >
                                        <AccordionSummary
                                            expandIcon={<DropIcon />}
                                            className='pb-4'
                                        >
                                            <Typography

                                                color={{ color: desk.status.normal ? '#439676' : '#AD3459' }}
                                                align='left'
                                                fontFamily={'Poppins'}
                                                fontSize='18px'
                                            >
                                                {desk.name}
                                            </Typography>

                                        </AccordionSummary>
                                        <AccordionDetails>

                                            <Typography
                                                color={'black'}
                                                align='left'
                                                fontFamily={'Poppins'}
                                                flexDirection={'row'}
                                                fontSize='14px'
                                            >

                                                <div className=''>
                                                    <span className='flex flex-row text-m'>
                                                        Circuito: <p className='text-gray-400 px-2'>{desk.circuit}</p>
                                                    </span>
                                                </div>
                                            </Typography>

                                            <Typography
                                                color={'black'}
                                                align='left'
                                                fontFamily={'Poppins'}
                                                flexDirection={'row'}
                                                fontSize='14px'

                                            >
                                                <div className=''>
                                                    <span className='flex flex-row py-2 text-m'>
                                                        Nro. de electores: <p className='text-gray-400 px-2'>{desk.electors}</p>
                                                    </span>
                                                </div>
                                            </Typography>

                                            <Typography
                                                color={'black'}
                                                align='left'
                                                fontFamily={'Poppins'}
                                                flexDirection={'row'}
                                                fontSize='14px'

                                            >


                                                <div className=''>
                                                    <span className='flex flex-row py-2 text-m'>

                                                        Nro. de sobres: <p className='text-gray-400 px-2'>{desk.envelopes}</p>
                                                    </span>
                                                </div>
                                            </Typography>


                                            <Typography
                                                color={'black'}
                                                align='left'
                                                fontFamily={'Poppins'}
                                                flexDirection={'row'}
                                                fontSize='14px'

                                            >

                                                <div className=''>
                                                    <span className='flex flex-row py-2 text-m'>

                                                        {desk.candidate1.name}: <p className='text-gray-400 px-2'>{desk.candidate1.votes}</p>
                                                    </span>
                                                </div>
                                            </Typography>

                                            <Typography
                                                color={'black'}
                                                align='left'
                                                fontFamily={'Poppins'}
                                                flexDirection={'row'}
                                                fontSize='14px'

                                            >

                                                <div className=''>
                                                    <span className='flex flex-row py-2 text-m'>

                                                        {desk.candidate2.name}: <p className='text-gray-400 px-2'>{desk.candidate2.votes}</p>
                                                    </span>
                                                </div>
                                            </Typography>

                                            <Typography
                                                color={'black'}
                                                align='left'
                                                fontFamily={'Poppins'}
                                                flexDirection={'row'}
                                                fontSize='14px'

                                            >

                                                <div className=''>
                                                    <span className='flex flex-row py-2 text-m'>

                                                        Votos nulos: <p className='text-gray-400 px-2'>{desk.nullVotes}</p>
                                                    </span>
                                                </div>
                                            </Typography>

                                            <Typography
                                                color={'black'}
                                                align='left'
                                                fontFamily={'Poppins'}
                                                flexDirection={'row'}
                                                fontSize='14px'

                                            >

                                                <div className=''>
                                                    <span className='flex flex-row py-2 text-m'>

                                                        Votos recurridos: <p className='text-gray-400 px-2'>{desk.recurredVotes}</p>
                                                    </span>
                                                </div>
                                            </Typography>

                                            <Typography
                                                color={'black'}
                                                align='left'
                                                fontFamily={'Poppins'}
                                                flexDirection={'row'}
                                                fontSize='14px'

                                            >

                                                <div className=''>
                                                    <span className='flex flex-row py-2 text-m'>

                                                        Votos identidad impugnada: <p className='text-gray-400 px-2'>{desk.envelopes}</p>
                                                    </span>
                                                </div>
                                            </Typography>

                                            <Typography
                                                color={'black'}
                                                align='left'
                                                fontFamily={'Poppins'}
                                                flexDirection={'row'}
                                                fontSize='14px'

                                            >

                                                <div className=''>
                                                    <span className='flex flex-row py-2 text-m'>

                                                        Votos de comando electoral: <p className='text-gray-400 px-2'>{desk.envelopes}</p>
                                                    </span>
                                                </div>
                                            </Typography>

                                            <Typography
                                                color={'black'}
                                                align='left'
                                                fontFamily={'Poppins'}
                                                flexDirection={'row'}
                                                fontSize='14px'

                                            >

                                                <div className=''>
                                                    <span className='flex flex-row py-2 text-m'>

                                                        Votos en blanco <p className='text-gray-400 px-2'>{desk.envelopes}</p>
                                                    </span>
                                                </div>
                                            </Typography>

                                            <Typography
                                                color={'black'}
                                                align='left'
                                                fontFamily={'Poppins'}
                                                flexDirection={'row'}
                                                fontSize='14px'

                                            >

                                                <div className=''>
                                                    <span className='flex flex-row py-2 text-m'>

                                                        Total <p className='text-gray-400 px-2'>{desk.envelopes}</p>
                                                    </span>
                                                </div>
                                            </Typography>

                                            <Typography
                                                color={'green'}
                                                align='left'
                                                fontFamily={'Poppins'}
                                                flexDirection={'row'}
                                                fontSize='14px'

                                            >


                                                <div className=''>
                                                    <span className='flex flex-row py-2 text-m text-black'>

                                                        Estado: <p className='px-2' style={{ color: desk.status.normal ? '#439676' : '#AD3459' }}>{desk.status.normal ? 'Normal' : 'Irregular'}</p>
                                                    </span>
                                                </div>
                                            </Typography>

                                            <div className='container flex flex-row gap-4 justify-between'>
                                                <div className='flex flex-row'>

                                                    <Button

                                                        className="border-2 text-white bg-violet-brand p-2 w-24 h-10 rounded-xl text-xs hover:border-violet-light my-4"
                                                        type="button"
                                                        label="Editar"

                                                    />


                                                </div>


                                                <div>

                                                    <Button

                                                        className="border-2 border-rose-700 text-rose-700 bg-transparent w-24 rounded-xl text-xs p-2 tracking-wider shadow-md hover:border-violet-light my-4"
                                                        type="button"
                                                        label="Eliminar"
                                                    />

                                                </div>

                                            </div>


                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </Overlay>
        </main>
    );
}

export default DeskList;