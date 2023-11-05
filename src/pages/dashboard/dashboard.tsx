import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { observer } from 'mobx-react-lite';
import * as yup from 'yup';
import Input from '#/components/input';
import useAxios from '#/hooks/utils/useAxios';
import { useAuth } from '#/context/AuthContext';
import { paths } from '#/routes/paths';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { PlusIcon } from '@radix-ui/react-icons';

interface DummyDataItem {
  name: string;
  lastname: string;
  email: string;
  dni: string;
  phone: string;
  state: string;
}

const DashboardPage: React.FC = () => {
  const dummyData: DummyDataItem[] = [
    {
      name: 'Javier',
      lastname: 'Milei',
      email: 'javiergerardo@lla.com',
      dni: '23045600',
      phone: '1155555555',
      state: 'registered',
    },
    {
      name: 'Karina',
      lastname: 'Milei',
      email: 'karinamilei@lla.com',
      dni: '33440434',
      phone: '33123123',
      state: 'unregistered',
    },
    {
      name: 'Ramiro',
      lastname: 'Marra',
      email: 'comproatun@lla.com',
      dni: '44003553',
      phone: '4244444444',
      state: 'registered',
    },
  ];

  return (
    <section className="flex flex-col items-center h-screen bg-gray-100 pt-20">
      <div className="shadow-3xl rounded-xl w-full">
        <div className="flex flex-col p-6 pt-2 pb-10">
          <div className="container">
            <div className="flex items-center justify-between my-10">
              <img
                src="assets/logos/fenix-login.svg"
                alt="fenix"
                className="object-cover h-auto rounded w-10 mr-4"
              />
              <Avatar style={{ backgroundColor: '#714FB6' }} variant="rounded">
                JM
              </Avatar>
            </div>
            <div>
              <div className="text-2xl text-start">Fiscales</div>
              <div className="flex items-center gap-2 justify-between mb-10">
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
              <Accordion
                key={index}
                style={{ marginTop: '4px', borderRadius: '16px' }}
                disableGutters
                elevation={0}
                sx={{
                  '&:before': {
                    display: 'none',
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<PlusIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div>
                    <div>
                      {data.name} {data.lastname}
                    </div>
                    <div className="text-[#363745] text-xs">{data.email}</div>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="text-start">
                    <div className="text-xs">Email:</div>
                    <div className="text-[#363745] text-sm">{data.email}</div>
                    <br />
                    <div className="text-xs">DNI:</div>
                    <div className="text-[#363745] text-sm">{data.dni}</div>
                    <br />
                    <div className="text-xs">Teléfono:</div>
                    <div className="text-[#363745] text-sm">{data.phone}</div>
                    <br />
                    <div className="text-xs">Estado:</div>
                    <div className="text-[#363745] text-sm">{data.state}</div>
                  </div>
                  <div>
                    <Button>Editar</Button>
                    <Button>Eliminar</Button>
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
      <div style={{ position: 'fixed', bottom: 16, width: '100%' }}>
        <Button
          variant="contained"
          size="large"
          style={{ width: '90%' }}
          endIcon={<PlusIcon />}
        >
          Agregar nuevo Fiscal
        </Button>
      </div>
    </section>
  );
};

export const Dashboard = observer(DashboardPage);

export default Dashboard;
