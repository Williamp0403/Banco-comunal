import { useState } from "react";
import DoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { useBank } from "../context/BankContext";
import { ProjectCard } from "./ProjectCard";
import CloseIcon from '@mui/icons-material/CloseOutlined';

export function NavProjects() {
  const [isOpen, setIsOpen] = useState(false);
  const { projects } = useBank()

  const toggleMenu = () => setIsOpen(!isOpen);

  const filteredProjects = projects.filter(
  project => project.estado === 'Pendiente' || project.estado === 'En Progreso'
);

  return (
    <nav className="relative z">
      <div 
        onClick={toggleMenu} 
        className="fixed right-0 top-1/2 -translate-y-1/2 bg-red-400 p-2 rounded-l-md cursor-pointer"
      >
        <DoubleArrowLeftIcon sx={{ fill: 'white' }} fontSize="large" />
      </div>
      <div className={`${ isOpen ? 'translate-x-0' : 'translate-x-full'} fixed top-0 right-0 h-screen w-[calc(100vw-60px)] sm:w-md bg-white transition-transform duration-300 ease-in-out z-15`}>
        <div className="p-5">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-lg sm:text-xl font-semibold">Proyectos en seguimiento</h1>
            <CloseIcon className='cursor-pointer' onClick={toggleMenu}/>
          </div>
          <div className="max-h-[80vh] overflow-y-auto p-2">
            {
              filteredProjects.length === 0 ? (
                <p className="text-center font-medium text-zinc-600">No hay proyectos en seguimiento.</p>
              ) : (
                <ul className="flex flex-col gap-y-5 sm:gap-y-8">
                  {filteredProjects.map(project => (
                    <ProjectCard key={project.id_proyecto} project={project}/>
                  ))}
                </ul>
              )}
          </div>
        </div>
      </div>
      {
        isOpen && <div onClick={toggleMenu} className="fixed z-10 top-0 right-0 left-0 bottom-0 h-screen bg-zinc-700 opacity-75"></div>
      }
    </nav>
  );
}

