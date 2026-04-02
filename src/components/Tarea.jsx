export const Tarea = ({ contenido, id, idColumna, alBorrar, moverTarea }) => {
  const manejarInicioArrastre = (e) => {
    e.dataTransfer.setData('idTarea', id);
    e.dataTransfer.setData('idOrigen', idColumna);
  };

  return (
    <li
      draggable={true}
      onDragStart={manejarInicioArrastre}
      className='flex items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm cursor-grab active:cursor-grabbing ...'>
      <span className='flex-1'>{contenido}</span>
      <button
        onClick={() => alBorrar(id)}
        className='ml-4 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all cursor-pointer active:scale-90'
        title='Eliminar tarea'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
          />
        </svg>
      </button>
    </li>
  );
};
