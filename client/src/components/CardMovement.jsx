import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/formatDate';

export function CardMovement ({ movement }) {
  const { nombre_proyecto, descripcion, transaccion, monto, fecha } = movement

  return (
    <div className="flex items-center justify-between p-3 border border-gray-400 rounded-md">
      <div className='flex items-center gap-x-2'>
       <span className={`${transaccion === "Retiro" ? 'bg-red-200' : 'bg-green-200'} w-8 h-8 min-w-8 min-h-8 flex items-center justify-center rounded-full`}>         
          {
            transaccion === "Retiro" ? <TrendingDown sx={{ fill: 'red' }} fontSize='small'/>
            : <TrendingUp sx={{ fill: 'green' }} fontSize='small'/>
          }
        </span>
        <div className='flex flex-col'>
          <h4 className='text-sm sm:text-base font-medium'>{nombre_proyecto}</h4>
          <p className='text-xs sm:text-sm text-zinc-500 font-medium'>{descripcion + " • " + formatDate(fecha)} </p>
        </div>
      </div>
      <div>
        {
          transaccion === "Retiro" ? <h5 className='text-xs sm:text-base font-medium text-red-500'>-{formatCurrency(monto)} Bs</h5>
          : <h5 className='text-xs sm:text-base font-medium text-green-500'>+{formatCurrency(monto)} Bs</h5>
        }
      </div>
    </div>
  ) 
}