import { ChipState } from "./Chip"
import { LongMenu } from "./Dropdowns"
import { useBank } from "../context/BankContext"
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { ModalTransaction } from "./Modal";

export function ProjectCard ({ project }) {
  const { nombre, descripcion, monto_total, monto_gastado, estado } = project
  const { addAmount, withdrawAmount } = useBank()

  return (
    <div className="flex flex-col justify-between gap-y-3  p-4 sm:p-5 w-full max-w-xl bg-white border border-zinc-400 rounded-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold truncate">{nombre}</h2>
        <LongMenu project={project}/>
      </div>
      <p className="text-zinc-700 text-sm font-medium truncate">{descripcion}</p>
      <div className="flex items-center justify-between">
        <span className="text-zinc-700 text-sm font-medium">Monto disponible</span>
        <h3 className="text-xl text-end font-bold">{monto_total - monto_gastado} Bs</h3>
      </div>
      { estado === 'En Progreso' &&  
        <div className="flex items-center justify-end gap-x-3">
          <ModalTransaction action={addAmount} title='Agregar saldo' Icon={<AddIcon fontSize="small"/>} name={project.nombre} id={project.id_proyecto}/>
          <ModalTransaction action={withdrawAmount} title='Retirar saldo' Icon={<RemoveIcon fontSize="small"/>} name={project.nombre} id={project.id_proyecto}/>
        </div>
       }
      <div className="flex justify-between">
        <div className="flex items-center gap-x-1">
          <PersonIcon htmlColor="gray" fontSize="medium"/>
          <h4 className="text-zinc-700 text-sm font-medium">{project.nombre_usuario + " " + project.apellido_usuario}</h4>
        </div>
        <ChipState title={estado}/>
      </div>
     
    </div>
  )
}