import { Chip } from "./Chip"
import { LongMenu } from "./Dropdowns"
import PersonIcon from '@mui/icons-material/Person';

export function ProjectCard ({ project }) {
  const { nombre, descripcion, monto_asignado, estado } = project

  return (
    <div className="flex flex-col justify-between gap-y-2 sm:gap-y-3 p-4 sm:p-5 w-full max-w-xl bg-white border border-zinc-300 rounded-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold truncate">{nombre}</h2>
        <LongMenu project={project}/>
      </div>
      <p className="text-zinc-700 text-sm font-medium truncate">{descripcion}</p>
      <div className="flex items-center justify-between">
        <span className="text-zinc-700 text-sm font-medium">Monto asignado</span>
        <h3 className="text-xl text-end font-bold">{monto_asignado} Bs</h3>
      </div>
      <div className="flex justify-between">

        <div className="flex items-center gap-x-1">
          <PersonIcon fontSize="medium"/>
          <h4 className="text-zinc-700 text-sm font-medium">{'William Pinto'}</h4>
        </div>
        <Chip title={estado}/>
      </div>
    </div>
  )
}