
import { SelectFilter } from "../components/Select";
import { Input, Textarea } from "../components/Input"
import { useForm } from "react-hook-form"
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { useEffect } from "react";
import { useBank } from "../context/BankContext";
import { Fade } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransitionSchema } from "../schemas/transaction.schema";

export function WithdrawAmountPage () {
  const { getBankData, withdrawAmount } = useBank()
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, watch, reset } = useForm({
    resolver: zodResolver(TransitionSchema)
  })

  useEffect(() => {
    getBankData();
  }, []);

  const onSumbit = handleSubmit(async values => {
    const dataTransaction = {
      monto: values.monto,
      descripcion: values.descripcion
    }
    await withdrawAmount(dataTransaction, values.id_proyecto, reset)
  })

  return (
    <Fade in={true} timeout={700}>
      <main className="container mx-auto ">
        <section className="p-8 sm:p-10">
          <div className="flex items-center gap-x-3 mb-5">
            <TrendingDownIcon sx={{fill: 'red' }} fontSize="large"/>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium">Retirar saldo</h1> 
          </div>
          <div className="max-w-md w-full flex flex-col bg-white p-5 shadow-2xl rounded-xl shadow-zinc-700 gap-4 items-center mx-auto">
              <h4 className="font-medium text-xl text-center">Datos de la transacción</h4>
              <form onSubmit={onSumbit} className="w-full flex flex-col gap-4">
                <SelectFilter watch={watch} setValue={setValue} errors={errors} />
                <Input type='number' name='monto' label='Monto' register={register} errors={errors.monto}/>
                <Textarea label='Descripción' register={register} name='descripcion' errors={errors.descripcion}/>
                <button 
                  disabled={isSubmitting}
                  className="bg-red-500 font-semibold text-white py-3 rounded-lg hover:bg-red-600 transition ease-in-out duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                  Retirar
                </button>
              </form>
            </div>
        </section>
      </main>
    </Fade>
  )
}