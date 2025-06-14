import * as React from 'react';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LogoutIcon from '@mui/icons-material/Logout';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { MenuItem, Tooltip } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { Input, InputDate, Textarea } from "../components/Input"
import { UpdateStateSchema } from '../schemas/project.schema';
import { useBank } from '../context/BankContext';
import { TransitionSchema } from "../schemas/transaction.schema"

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
    resolver: zodResolver(TransitionSchema)
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
          <p className='text-zinc-500 mb-5'>{title} al proyecto "{name}".</p>
          <form onSubmit={onSubmit} className='flex flex-col gap-y-4'>
            <Input type='number' name='monto' label='Monto' register={register} errors={errors.monto} />
            <Textarea  name='descripcion' label='Descripción' register={register} errors={errors.descripcion} />
            <DialogActions>
              <button 
                type='button'
                onClick={handleClose}
                className='bg-zinc-500 text-white px-3 py-1 font-semibold rounded-sm cursor-pointer '
                >
                Cancelar
              </button>
              <button
                className={`${title === "Agregar saldo" ? 'bg-green-500' : 'bg-red-400'} text-white px-3 py-1 font-semibold rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
                disabled={isSubmitting}
              >  
                Confirmar
              </button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export function ModalDeleteProject ({ title, id }) {
  const { deleteProject } = useBank()
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <MenuItem onClick={handleClickOpen}>
        <DeleteIcon />
        Eliminar
      </MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Eliminar proyecto.
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro que deseas eliminar el proyecto "{title}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button 
            onClick={handleClose}
            className='bg-zinc-500 text-white px-3 py-1 font-semibold rounded-sm cursor-pointer'>
              Cancelar
          </button>
          <button 
            onClick={() => deleteProject(id)}
            className='bg-red-400 text-white px-3 py-1 font-semibold rounded-sm cursor-pointer'>
              Eliminar
          </button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export function ModalUpdateState ({ id, handleCloseMenu }) {
  const { updateState } = useBank()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(UpdateStateSchema)
  });
  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = handleSubmit(async data => {
    await updateState(data, id, handleCloseMenu)
  });

  return (
    <React.Fragment>
      <MenuItem onClick={handleClickOpen}>
        <ChangeCircleIcon />
        Cambiar a "En Progreso"
      </MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ fontWeight: "bold" }} id="alert-dialog-title">
          Cambiar Estado
        </DialogTitle>
        <DialogContent className="space-y-20">
          <form onSubmit={onSubmit} className="flex flex-col gap-y-3 pt-2">
            <InputDate
              name='fecha_fin' 
              label='Fecha Limite'
              register={register} 
              errors={errors.fecha_fin} 
              restrictionType="future"
            />
            <p className="text-zinc-500 text-sm font-medium">
              Cambia el estado de "Pendiente" a "En Progreso", para confirmar que el proyecto ya ha comenzado.
            </p>
            <DialogActions>
              <button 
                type='button'
                onClick={handleClose}
                className='bg-zinc-500 text-white px-3 py-1 font-semibold rounded-sm cursor-pointer '
                >
                Cancelar
              </button>
              <button
                className='bg-green-500 text-white px-3 py-1 font-semibold rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                disabled={isSubmitting}
              >  
                Confirmar
              </button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}