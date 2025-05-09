import { Input, Textarea } from "../components/Input"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { projectSchema } from "../schemas/project.schema"
import { useBank } from "../context/BankContext"

export function CreateProjectPage () {
  const { createProject } = useBank()
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(projectSchema)
  })

  const onSubmit = handleSubmit(data => {
    createProject(data, reset)
    console.log(data)
  })

  return (
    <main className="container mx-auto ">
    <section className="p-8 sm:p-10">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-5">Crear Proyecto</h1>
      <div className="max-w-md w-full flex flex-col gap-4 items-center mx-auto">
        <h4 className="font-medium text-lg text-center">Datos del proyecto</h4>
        <form className="w-full flex flex-col gap-4" onSubmit={onSubmit}>
          <div className="flex gap-x-5">
            <Input type='text' name='nombre' placeholder='Nombre' register={register} errors={errors.nombre}/>
            <Input type='number' name='monto_asignado' placeholder='Monto' register={register} errors={errors.monto_asignado}/>
          </div>
          <Textarea name='descripcion' placeholder='Descripcion' register={register} errors={errors.descripcion}/>
          <select { ...register('estado') } className={`${ errors.estado ? 'border-red-500 placeholder:text-red-500 focus:border-2' : 'border-zinc-400  hover:border-zinc-600 focus:border-2 ' } w-full border rounded-md  focus:outline-none p-3`}>
            <option value="En Progreso">En Progreso</option>
            <option value="Pendiente">Pendiente</option>
          </select>
          { errors.estado && <p className="text-red-500 font-medium text-xs mt-0">{ errors.estado.message }</p> }
          <button className="bg-red-400 font-semibold text-white py-3 rounded-lg hover:bg-red-500 transition ease-in-out duration-300 hover:cursor-pointer">Crear</button>
        </form>
      </div>
    </section>
  </main>
  )
} 