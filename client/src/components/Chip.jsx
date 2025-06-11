import { Tooltip } from "@mui/material";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

export function ChipState({ title }) {
  let bgColor;

  switch (title) {
    case 'Pendiente':
      bgColor = 'bg-zinc-400';
      break;
    case 'En Progreso':
      bgColor = 'bg-blue-400';
      break;
    case 'Completado':
      bgColor = 'bg-green-400';
      break;
    default:
      bgColor = 'bg-gray-400';
  }

  return (
    <Tooltip title='Estado' placement="top">
      <div className={`${bgColor} text-white text-xxs inline-block sm:text-xs font-bold rounded-full px-3 py-1`}>
        <span>{title}</span>
      </div>
    </Tooltip>
  );
}

export function TransactionChip({ type }) {
  return (
    <div className={`inline-flex items-center gap-1 ${type === "Depósito" ? 'bg-green-500' : 'bg-red-500'} text-white text-xxs sm:text-xs font-bold py-[2px] sm:py-1 px-2 rounded-full`}>
      { type === "Depósito" ? <TrendingUpIcon fontSize="small"/> : <TrendingDownIcon fontSize="small"/> }
      <span>{type}</span>
    </div>
  );
}


