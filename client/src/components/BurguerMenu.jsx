import { useState } from "react"
import MenuIcon from '@mui/icons-material/MenuOutlined'
import CloseIcon from '@mui/icons-material/CloseOutlined';
import { NavLink } from "react-router-dom";
import { AccordionUsage } from "./Accordion";

export function BurguerMenu () {
  const [ isOpen, setIsOpen ] = useState(false)
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className='block relative md:hidden'>
      <MenuIcon className='cursor-pointer' fontSize='large' onClick={toggleMenu}/>
      <div className={`${ isOpen ? 'translate-x-0' : 'translate-x-full'} fixed top-0 right-0 h-screen w-[calc(100vw-60px)] bg-zinc-200 transition-transform duration-300 ease-in-out z-50`}>
        <div className="p-2">
          <div className="flex justify-end mb-10">
            <CloseIcon className='cursor-pointer' fontSize='large' onClick={toggleMenu}/>
          </div>
          <ul className="flex flex-col justify-center items-start">
           <li className="border-t border-zinc-500 w-full">
              <NavLink className="p-4 font-semibold w-full block" to="/dashboard" onClick={toggleMenu}>
                Inicio
              </NavLink>
            </li>
            <li className="w-full">
              <AccordionUsage 
                title='Proyectos'
                options={[
                {
                  name: 'Ver proyectos',
                  to: '/proyectos'
                },
                {
                  name: 'Crear proyectos',
                  to: '/crear-proyecto'
                }
              ]}  
              handleClick={() => setIsOpen(!isOpen)}
              />
            </li>
            <li className="w-full">
              <AccordionUsage 
                title='Transacciones'
                  options={[
                  {
                    name: 'Agregar saldo',
                    to: '/agregar-saldo'
                  },
                  {
                    name: 'Retirar saldo',
                    to: '/retirar-saldo'
                  }
                ]}
                handleClick={() => setIsOpen(!isOpen)}
              />
            </li>
            <li className="border-t border-zinc-500 w-full">
              <NavLink className="p-4 font-semibold w-full block" to="/movimientos" onClick={toggleMenu}>
                Movimientos
              </NavLink>
            </li>
            <li className="border-t border-zinc-500 w-full">
              <NavLink className="p-4 font-semibold w-full block" to="/reportes" onClick={toggleMenu}>
                Reportes
              </NavLink>
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