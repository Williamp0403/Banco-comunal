
import { SelectFilter } from "../components/Select";
import { InputMonto, Textarea } from "../components/Input"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useEffect } from "react";
import { useBank } from "../context/BankContext";
import { Fade } from "@mui/material";
import { TransitionWithProjectSchema } from "../schemas/transaction.schema"

export function AddAmountPage () {
  const { getBankData, addAmount } = useBank()
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, reset, watch } = useForm({
    resolver: zodResolver(TransitionWithProjectSchema),
  })

  useEffect(() => {
    getBankData();
  }, []);

  const monto = watch("monto")

  const onSumbit = handleSubmit(async values => {
    const dataTransaction = {
      monto: values.monto,
      descripcion: values.descripcion
    }
    await addAmount(dataTransaction, values.id_proyecto, reset)
  })

  return (
    <Fade in={true} timeout={700}>
      <main className="container mx-auto ">
        <section className="p-8 sm:p-10">
          <div className="flex items-center gap-x-3 mb-5">
            <TrendingUpIcon sx={{fill: 'green' }} fontSize="large"/>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium">Agregar saldo</h1> 
          </div>
          <div className="max-w-md w-full flex flex-col bg-white p-5 shadow-2xl rounded-xl shadow-zinc-700 gap-4 items-center mx-auto">
              <h4 className="font-medium text-xl text-center">Datos de la transacción</h4>
              <form onSubmit={onSumbit} className="w-full flex flex-col gap-4">
                <SelectFilter watch={watch} setValue={setValue} errors={errors} />
                <InputMonto
                  name="monto"
                  label="Monto"
                  error={errors.monto}
                  setValue={setValue}
                  value={monto}
                />
                <Textarea label='Descripción' register={register} name='descripcion' errors={errors.descripcion}/>
                <button 
                  disabled={isSubmitting}
                  className="bg-green-600 font-semibold text-white py-3 rounded-lg hover:bg-green-500 transition ease-in-out duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                  Agregar
                </button>
              </form>
            </div>
        </section>
      </main>
    </Fade>
  )
}