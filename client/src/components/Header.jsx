import ConsejosComunales from '../assets/consejos-comunales.png'
import BancoDeLaComuna from '../assets/banco-de-la-comuna.png'

export function Header () {
  return (
    <header className="sticky top-0 bg-zinc-100 ">
      <nav className="flex px-4 sm:px-6 items-center justify-between">
        <img src={ConsejosComunales} className='w-full max-w-25 sm:max-w-30' alt="Consejos comunales" />
        <img src={BancoDeLaComuna} className='w-full max-w-25 sm:max-w-30' alt="Banco de la comuna" />
      </nav>
    </header>
  )
}