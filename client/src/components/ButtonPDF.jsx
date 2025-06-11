import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';

export function ButtonPDF ({ loading }) {
  return (
    loading ? <button className='flex items-center gap-x-2 border text-sm border-zinc-400 rounded-md hover:bg-zinc-200 p-2 font-medium cursor-pointer'>Cargando...</button>
    : <button className='flex items-center gap-x-2 border text-sm border-zinc-400 rounded-md hover:bg-zinc-200 p-2 font-medium cursor-pointer'>
        <SaveAltOutlinedIcon/>
        <span className="hidden sm:block">Descargar PDF</span>
      </button>
  )
}