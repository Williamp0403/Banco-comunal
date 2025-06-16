import { useForm } from "react-hook-form"
import { useMovement } from "../hooks/useMovement"
import { Fade, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { zodResolver } from '@hookform/resolvers/zod'
import { InputDate } from "../components/Input";
import { MovementSchema } from "../schemas/movement.schema";
import { TransactionChip } from "../components/Chip";
import { PDFDownloadLink } from "@react-pdf/renderer"
import { PDF } from "../components/PDF";
import { Loading } from "../components/Loading";
import { ButtonPDF } from "../components/ButtonPDF";
import { formatCurrency } from "../utils/formatCurrency";

export function MovementsPage() {
  const { getMovements, movements } = useMovement();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(MovementSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    await getMovements(data);
  });

  const hasMovements = movements && movements.length > 0; // ✅ Centralización de la condición

  return (
    <Fade in={true} timeout={700}>
      <main className="container mx-auto">
        <section className="flex flex-col gap-y-5 p-8 sm:p-10">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium">Movimientos</h1>
          <div className="w-full flex flex-col items-center justify-center bg-white border border-zinc-400 p-5 rounded-lg gap-4 mx-auto">
              <h4 className="font-medium text-xl text-center">Búsqueda por fecha</h4>
              <form onSubmit={onSubmit} className="w-full max-w-md flex flex-col items-center gap-y-3">
                <div className="w-full flex justify-center gap-x-5">
                  <InputDate name="since" label="Desde" register={register} errors={errors.since} restrictionType="past" />
                  <InputDate name="until" label="Hasta" register={register} errors={errors.until} restrictionType="past" />
                </div>
                <button disabled={isSubmitting} className="bg-red-400 w-36 font-semibold text-white py-2 rounded-lg hover:bg-red-500 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                  Enviar
                </button>
              </form>
            </div>
            {movements === null ? null : isSubmitting ? <Loading className="flex justify-center" /> : (
              <div className="w-full flex flex-col bg-white border border-zinc-400 p-5 rounded-lg gap-4 mx-auto">
                <div className="w-full flex justify-between items-center">
                  <div className="space-y-2">
                    <h4 className="font-medium text-xl">Resultados de búsqueda</h4>
                    <p className="text-sm font-medium text-zinc-500">{movements.length} movimiento(s) encontrado(s)</p>
                  </div>
                  {hasMovements && (
                    <PDFDownloadLink document={<PDF movements={movements} />} fileName="movimientos.pdf">
                      {({ loading }) => <ButtonPDF loading={loading}/>}
                    </PDFDownloadLink>
                  )}
                </div>

                {hasMovements ? (
                  <TableContainer sx={{ width: '100%', overflowX: 'auto' }}>
                    <Table sx={{ width: '100%', minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          {["Fecha", "Proyecto", "Responsable", "Tipo", "Descripción", "Monto"].map((header, index) => (
                            <TableCell key={index} align={index === 5 ? "right" : "left"}>{header}</TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {movements.map((movement) => (
                          <TableRow key={movement.id_movimiento} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>{movement.fecha}</TableCell>
                            <TableCell>{movement.nombre_proyecto}</TableCell>
                            <TableCell>{movement.nombre_usuario + " " + movement.apellido_usuario}</TableCell>
                            <TableCell><TransactionChip type={movement.transaccion} /></TableCell>
                            <TableCell>{movement.descripcion}</TableCell>
                            <TableCell align="right">
                              {movement.transaccion === "Depósito" ?
                                <span className="font-bold text-green-500">+{formatCurrency(movement.monto)} Bs</span> :
                                <span className="font-bold text-red-500">-{formatCurrency(movement.monto)} Bs</span>
                              }
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (    
                      <div className="w-full flex flex-col gap-y-3 items-center justify-center py-5">
                        <DescriptionOutlinedIcon sx={{ fontSize: 50, color: 'gray' }} />
                        <h1 className="text-base sm:text-lg font-medium">No se encontraron movimientos</h1>
                      </div>
                    )}
              </div>
            )}
        </section>
      </main>
    </Fade>
  );
}