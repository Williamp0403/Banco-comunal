import * as React from 'react';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Tooltip } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { Input, Textarea } from "../components/Input"
import { addAmountSchema } from '../schemas/project.schema';

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

export function ModalTransaction({ action, title, Icon, name, id }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(addAmountSchema)
  })
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false)
  };

  const onSubmit = handleSubmit(async data => {
    await action(data, id, handleClose)
  })

  return (
    <React.Fragment>
      <Tooltip title={title}>       
        <button 
          onClick={handleClickOpen}
          className='px-3 py-1 rounded-md border border-zinc-400 hover:bg-zinc-200 transition ease-in-out duration-300 cursor-pointer'
        >
          {Icon}
          
        </button>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth='xs'
      >
        <DialogTitle sx={{ fontWeight: 'bold' }} id="alert-dialog-title">
            {title}
        </DialogTitle>
        <DialogContent className='space-y-5'>
          <p className='text-zinc-500 text-base mb-5'>{title} al proyecto "{name}".</p>
          <form onSubmit={onSubmit} className='flex flex-col gap-y-4'>
            <Input type='number' name='monto' label='Monto' register={register} errors={errors.monto} />
            <Textarea  name='descripcion' label='Descripción' register={register} errors={errors.descripcion} />
            <button 
              disabled={isSubmitting}
              className='text-white text-sm font-semibold rounded-md bg-zinc-800 py-3 px-5 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed'>
              Confirmar
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
