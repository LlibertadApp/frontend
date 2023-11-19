import { useAuth } from '#/context/AuthContext';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { LogoutModalProps } from './types';

const LogoutModal: React.FC<LogoutModalProps> = ({ open, setOpen }) => {
  const { logout } = useAuth();

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Confirmación</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Queres salir de tu cuenta como Fiscal?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button
          onClick={handleLogout}
          autoFocus
          variant="contained"
          color="error"
        >
          Si, salir.
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutModal;
