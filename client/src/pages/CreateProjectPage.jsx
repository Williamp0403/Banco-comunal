import { Input, Textarea } from "../components/Input"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { projectSchema } from "../schemas/project.schema"
import { useBank } from "../context/BankContext"

export function CreateProjectPage () {
  const { createProject } = useBank()
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(projectSchema)
  })

  const onSubmit = handleSubmit(async data => {
    await createProject(data, reset)
  })

  return (
    <main className="container mx-auto ">
    <section className="p-8 sm:p-10">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-5">Crear Proyecto</h1>
      <div className="max-w-md w-full flex flex-col bg-white p-5 shadow-2xl rounded-xl shadow-zinc-700 gap-4 items-center mx-auto">
        <h4 className="font-medium text-xl text-center">Datos del proyecto</h4>
        <form className="w-full flex flex-col gap-4" onSubmit={onSubmit}>
          <div className="flex gap-x-5">
            <Input 
              type='text' 
              name='nombre' 
              placeholder='Nombre' 
              register={register} 
              errors={errors.nombre}
            />
            <Input 
              type='number' 
              name='monto_asignado' 
              placeholder='Monto' 
              register={register} 
              errors={errors.monto_asignado}
            />
          </div>
          <Textarea 
            name='descripcion' 
            placeholder='Descripcion' 
            register={register} 
            errors={errors.descripcion}
          />
          <select 
            { ...register('estado') } 
            className={`${ errors.estado ? 'border-red-500 placeholder:text-red-500 focus:border-2' : 'border-zinc-400  hover:border-zinc-600 focus:border-2 ' } w-full border rounded-md  focus:outline-none p-3`}
          >
            <option value="Pendiente">Pendiente</option>
            <option value="En Progreso">En Progreso</option>
          </select>
          { errors.estado && <p className="text-red-500 font-medium text-xs mt-0">{ errors.estado.message }</p> }
          <button 
            disabled={isSubmitting}
            className="bg-red-400 font-semibold text-white py-3 rounded-lg hover:bg-red-500 transition ease-in-out duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
            Crear
          </button>
        </form>
      </div>
    </section>
  </main>
  )
} 