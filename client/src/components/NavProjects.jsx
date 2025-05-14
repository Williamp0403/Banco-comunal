import { useState } from "react";
import DoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { useBank } from "../context/BankContext";
import { Chip } from "./Chip";
import CloseIcon from '@mui/icons-material/CloseOutlined';

export function NavProjects() {
  const [isOpen, setIsOpen] = useState(false);
  const { projects } = useBank()

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="relative">
      <div 
        onClick={toggleMenu} 
        className="fixed right-0 top-1/2 -translate-y-1/2 bg-red-400 p-2 rounded-l-md cursor-pointer"
      >
        <DoubleArrowLeftIcon sx={{ fill: 'white' }} fontSize="large" />
      </div>
      <div className={`${ isOpen ? 'translate-x-0' : 'translate-x-full'} fixed top-0 right-0 h-screen w-[calc(100vw-60px)] sm:w-md bg-white transition-transform duration-300 ease-in-out z-10`}>
        <div className="p-5">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-lg sm:text-xl font-semibold">Proyectos en seguimiento</h1>
            <CloseIcon className='cursor-pointer' onClick={toggleMenu}/>
          </div>
          <div className="max-h-[80vh] overflow-y-auto p-2">
            <ul className="flex flex-col gap-y-5 sm:gap-y-8">
              {
                projects.map(project => {
                  return (
                    <li className="w-full p-3 sm:p-5 rounded-2xl border-2 border-zinc-300" key={project.id_proyecto}>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold tex-lg sm:text-xl">{project.nombre}</h3>
                        <Chip title={project.estado}/>
                      </div>
                        <p className="font-semibold text-base sm:text-lg">{project.monto_asignado} Bs</p>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
      {
        isOpen && <div onClick={toggleMenu} className="fixed top-0 right-0 left-0 bottom-0 h-screen bg-zinc-700 opacity-75"></div>
      }
    </nav>
  );
}

