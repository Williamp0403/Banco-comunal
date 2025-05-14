import { useState } from "react"
import MenuIcon from '@mui/icons-material/MenuOutlined'
import CloseIcon from '@mui/icons-material/CloseOutlined';
import { NavLink } from "react-router-dom";

export function BurguerMenu () {
  const [ isOpen, setIsOpen ] = useState(false)
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className='block relative md:hidden'>
      <MenuIcon className='cursor-pointer' fontSize='large' onClick={toggleMenu}/>
      <div className={`${ isOpen ? 'translate-x-0' : 'translate-x-full'} fixed top-0 right-0 h-screen w-[calc(100vw-120px)] bg-zinc-200 transition-transform duration-300 ease-in-out z-50`}>
        <div className="p-5">
          <div className="flex justify-end mb-10">
            <CloseIcon className='cursor-pointer' fontSize='large' onClick={toggleMenu}/>
          </div>
          <ul className="flex flex-col space-y-10 justify-center items-center">
            <li onClick={toggleMenu}>
              <NavLink to='/dashboard' className='text-center'>Inicio</NavLink>
            </li>
            <li onClick={toggleMenu}>
              <NavLink to='/projects' className='text-center'>Proyectos</NavLink>
            </li>
            <li onClick={toggleMenu}>
              <NavLink to='/history'>Transacciones</NavLink>
            </li>
            <li onClick={toggleMenu}>
              <NavLink to='/category'>Movimientos</NavLink>
            </li>
            <li onClick={toggleMenu}>
              <NavLink to='/category'>Reportes</NavLink>
            </li>
          </ul>
        </div>
      </div>
      {
        isOpen && <div onClick={toggleMenu} className="fixed top-0 right-0 left-0 bottom-0 h-screen bg-zinc-700 opacity-75"></div>
      }
    </nav>
  )
}