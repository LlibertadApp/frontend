import { useAuth } from '#/context/AuthContext';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { LogoutModalProps } from './types';
import { useTranslation } from 'react-i18next';

const LogoutModal: React.FC<LogoutModalProps> = ({ open, setOpen }) => {
  const { t } = useTranslation('logoutModal');
  const { logout } = useAuth();

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{t('confirmation')}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{t('you_want_to_leave?')}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('cancel')}</Button>
        <Button onClick={handleLogout} autoFocus variant="contained" color="error">
          {t('yes')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutModal;
