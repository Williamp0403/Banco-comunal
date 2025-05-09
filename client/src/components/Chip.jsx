export function Chip({ title }) {
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
      bgColor = 'bg-red-400';
  }

  return (
    <div className={`${bgColor} text-white text-xs font-semibold rounded-full px-3 py-1`}>
      <span>{title}</span>
    </div>
  );
}
