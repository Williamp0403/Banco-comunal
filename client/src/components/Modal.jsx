import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LogoutIcon from '@mui/icons-material/Logout';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { MenuItem, Tooltip } from '@mui/material';
import { useAuth } from '../context/AuthContext';

export function ModalLogout() {
  const { logout } = useAuth()
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Tooltip title="Cerrar sesión">
        <IconButton onClick={handleClickOpen}>
          <LogoutIcon fontSize='large'/>
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Cerrar sesión.
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro que deseas cerrar sesión?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" size='small' color='' onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="outlined" size='small' color='error' onClick={logout}>
            Cerrar sesión
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export function ModalViewProject({ project }) {
  const { nombre, descripcion, monto_asignado, estado, fecha_inicio, fecha_fin } = project
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <MenuItem onClick={handleClickOpen} disableRipple>
        <VisibilityIcon />
        Ver detalles
      </MenuItem> 
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Detalles del Proyecto.
        </DialogTitle>
        <DialogContent>
          <h3>{nombre}</h3>
          <p>{descripcion}</p>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
