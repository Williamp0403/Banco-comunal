import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../schemas/auth.schema'
import { Input } from '../components/Input'
import { useAuth } from '../context/AuthContext'

export function LoginPage () {
  const { login } = useAuth()
  const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = handleSubmit(async data => {
    await login(data)
  })

  return (
    <main className="container mx-auto">
      <section className="p-10 sm:p-12">
        <div className="bg-white mx-auto p-5 sm:p-8 rounded-xl shadow-2xl w-full max-w-sm">
          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <h2 className="text-xl sm:text-2xl font-medium text-center">Iniciar sesión</h2>
            <Input 
              type='text' 
              name='nombre' 
              placeholder='Usuario' 
              register={register} 
              errors={errors.nombre}
            />
            <Input 
              type='password' 
              name='contraseña' 
              placeholder='Contraseña' 
              register={register} 
              errors={errors.contraseña}
            />
            <button 
              disabled={isSubmitting}
              className="bg-red-400 font-semibold text-white py-3 rounded-lg hover:bg-red-500 transition ease-in-out duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Enviar
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
