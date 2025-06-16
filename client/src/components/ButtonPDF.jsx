import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import { CircularProgress } from '@mui/material';

export function ButtonPDF({ loading }) {
  return (
    <button 
      className="flex items-center gap-x-2 border text-sm border-zinc-400 rounded-md hover:bg-zinc-200 p-2 transition duration-300 ease-in-out font-medium cursor-pointer"
      disabled={loading}
    >
      {loading ? (
        <CircularProgress size={20} color="inherit" />
      ) : (
        <>
          <SaveAltOutlinedIcon />
          <span className="hidden sm:block">Descargar PDF</span>
        </>
      )}
    </button>
  );
}
