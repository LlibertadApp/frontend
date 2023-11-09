import React from 'react';
import { observer } from 'mobx-react-lite';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import Drawer from '@mui/material/Drawer';
import Pagination from '@mui/material/Pagination';
import { PlusCircle } from '@phosphor-icons/react';
import { DashboardAccordion } from '#/components/dashboardComponents';
import DashboardForm from '#/components/dashboardForm';
import { DummyDataItem } from './types';

const DashboardPage: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setIsDrawerOpen(open);
    };

  const list = (anchor: string) => (
    <div className="inline-block">
      <DashboardForm />
    </div>
  );

  const dummyData: DummyDataItem[] = [
    {
      name: 'Javier',
      lastname: 'Milei',
      email: 'javiergerardo@lla.com',
      dni: '23045600',
      phone: '1155555555',
      state: 'active',
    },
    {
      name: 'Karina',
      lastname: 'Milei',
      email: 'karinamilei@lla.com',
      dni: '33440434',
      phone: '33123123',
      state: 'inactive',
    },
    {
      name: 'Ramiro',
      lastname: 'Marra',
      email: 'comproatun@lla.com',
      dni: '44003553',
      phone: '4244444444',
      state: 'active',
    },
    {
      name: 'Lillia',
      lastname: 'Limones',
      email: 'cosplayer1990@lla.com',
      dni: '36500453',
      phone: '3123123123',
      state: 'inactive',
    },
    {
      name: 'Miriam',
      lastname: 'Bregman',
      email: 'bregman@pts.com',
      dni: '39222200',
      phone: '3123123',
      state: 'active',
    },
  ];

  return (
    <section className="flex flex-col items-center h-screen">
      {/* Seccion principal, Input para buscar Fiscales, Filtros */}

      {/* Header Aguila y Perfil/Avatar */}
      <div className="container p-4">
        <div className="flex items-center justify-between mb-5">
          <div>
            <img
              src="assets/logos/fenix-login.svg"
              alt="fenix"
              className="object-cover h-auto rounded w-10"
            />
            <div className="text-2xl text-start mb-2 text-violet-brand">
              Fiscales
            </div>
          </div>
          <Avatar style={{ backgroundColor: '#714FB6' }} variant="rounded">
            JM
          </Avatar>
        </div>

        {/*Seccion Buscar Fiscales, Accordions*/}
        <div className="container bg-gray-100 p-4 rounded-lg h-full">
          <div>
            <div className="flex items-center gap-2 justify-between mb-2">
              <TextField
                placeholder="Buscar Fiscal"
                InputProps={{
                  style: { borderRadius: '12px' },
                }}
                sx={{ width: '90%' }}
              />
              <ToggleButton
                value="check"
                sx={{
                  backgroundColor: '#363745',
                  borderRadius: '12px', // Ajusta el valor según tu preferencia
                  '&:hover': {
                    backgroundColor: '#363745',
                  },
                }}
              >
                <img
                  src={`assets/icon/sliders-icon.svg`}
                  alt="Sliders"
                  className="w-6 h-6"
                />
              </ToggleButton>
            </div>
          </div>

          {dummyData.map((data, index) => (
            <DashboardAccordion key={index} data={data} />
          ))}

          <div className="flex justify-center">
            <Pagination
              variant="outlined"
              shape="rounded"
              size="large"
              count={11}
              defaultPage={2}
              siblingCount={0}
              style={{ marginTop: '4px' }}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          position: 'fixed',
          bottom: 16,
          left: 0,
          right: 0,
          paddingLeft: '5%',
          paddingRight: '5%',
        }}
      >
        <Button
          variant="contained"
          size="large"
          style={{ width: '90%' }}
          endIcon={<PlusCircle />}
          sx={{ textTransform: 'capitalize' }}
          onClick={toggleDrawer(true)}
        >
          Agregar nuevo fiscal
        </Button>
      </div>
      <Drawer
        PaperProps={{
          sx: {
            borderTopLeftRadius: 12, // Ajusta el valor de acuerdo a la curvatura deseada
            borderTopRightRadius: 12, // Ajusta el valor de acuerdo a la curvatura deseada
          },
        }}
        anchor="bottom" // Cambia esto por la posición donde quieras que aparezca el Drawer
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
      >
        {list('bottom')}
      </Drawer>
    </section>
  );
};

export const Dashboard = observer(DashboardPage);

export default Dashboard;
