import { InputMonto, Input, InputDate, Textarea } from "../components/Input"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { projectSchema } from "../schemas/project.schema"
import { useBank } from "../context/BankContext"
import { SelectBasic } from "../components/Select"
import { useEffect } from "react"
import { Fade } from "@mui/material"

export function CreateProjectPage () {
  const { createProject } = useBank()
  const {  register, handleSubmit, formState: { errors, isSubmitting }, watch, setValue, reset } = useForm({
    resolver: zodResolver(projectSchema),
  })

  const selectState = watch("estado"); 
  const monto = watch("monto_total")

  console.log(monto)

  useEffect(() => {
    if (selectState !== "En Progreso") {
      setValue("fecha_fin", undefined)
    }
  }, [selectState, setValue]);

  const onSubmit = handleSubmit(async data => {
    console.log(data)
    await createProject(data, reset)
  })

  return (
    <Fade in={true} timeout={700}>
      <main className="container mx-auto ">
        <section className="p-8 sm:p-10">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-5">Crear Proyecto</h1>
          <div className="max-w-md w-full flex flex-col bg-white p-5 border border-zinc-400 rounded-lg gap-4 items-center mx-auto">
            <h4 className="font-medium text-xl text-center">Datos del proyecto</h4>
            <form className="w-full flex flex-col gap-4" onSubmit={onSubmit}>
              <div className="flex gap-x-5">
                <Input 
                  type='text' 
                  name='nombre' 
                  label='Nombre' 
                  register={register} 
                  errors={errors.nombre}
                />
                <InputMonto
                  name="monto_total"
                  label="Monto"
                  error={errors.monto_total}
                  setValue={setValue}
                  value={monto}
                />
              </div>
              <Textarea 
                name='descripcion' 
                label='Descripcion' 
                register={register} 
                errors={errors.descripcion}
              />
              {
                selectState === 'En Progreso' && (
                  <InputDate 
                    name='fecha_fin' 
                    label='Fecha Limite'
                    register={register} 
                    errors={errors.fecha_fin} 
                    restrictionType="future"
                  />
                )
              }
              <SelectBasic 
                name='estado' 
                label='Estado' 
                register={register} 
                errors={errors.estado}
              />
              <button 
                disabled={isSubmitting}
                className="bg-red-400 font-semibold text-white py-3 rounded-lg hover:bg-red-500 transition ease-in-out duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                Crear Proyecto
              </button>
            </form>
          </div>
        </section>
      </main>
    </Fade>
  )
} 