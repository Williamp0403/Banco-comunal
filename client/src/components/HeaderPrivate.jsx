import { NavLink } from 'react-router-dom'
import BancoDeLaComuna from '../assets/banco-de-la-comuna.png'
import { BurguerMenu } from './BurguerMenu'
import { ModalLogout } from './Modal'
import { Dropdowns } from './Dropdowns'

export function HeaderPrivate () {
  return (
    <header className="sticky top-0 z-5 bg-zinc-100">
      <nav className="flex items-center justify-between px-4 lg:px-8">
        <img src={BancoDeLaComuna} className='w-full max-w-20 sm:max-w-25' alt="Banco de la comuna" />
        <ul className='hidden md:flex md:justify-between md:gap-x-6 md:items-center'>
          <li>
            <NavLink to='/dashboard'>Inicio</NavLink>
          </li>
          <li>
            <Dropdowns 
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
              ]}/>
          </li>
          <li>
            <Dropdowns 
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
                ]}/>       
          </li>
          <li>
            <NavLink to='/movimientos'>Movimientos</NavLink>      
          </li>
          <li>
            <NavLink to='/reportes'>Reportes</NavLink>  
          </li>
        </ul>
        <div className='flex items-center space-x-3 sm:space-x-0'>
          <ModalLogout/>
          <BurguerMenu/>
        </div>
      </nav>
    </header>
  )
}