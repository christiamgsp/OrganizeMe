import React from 'react';

export const Tarea = ({ contenido, id, idColumna, alBorrar }) => {
  // Preparamos los datos al empezar a arrastrar
  const manejarInicioArrastre = (e) => {
    e.dataTransfer.setData('idTarea', id);
    e.dataTransfer.setData('idOrigen', idColumna);

    // Opcional: Añadimos un efecto visual al elemento que se queda
    e.target.style.opacity = '0.5';
  };

  const manejarFinArrastre = (e) => {
    // Restauramos la opacidad al soltar
    e.target.style.opacity = '1';
  };

  return (
    <li
      draggable={true}
      onDragStart={manejarInicioArrastre}
      onDragEnd={manejarFinArrastre}
      // bg-blue-50: El color de fondo que pedías para la tarea
      // border-blue-200: El borde para que contraste
      // hover:bg-blue-100: Efecto al pasar el ratón
      className='flex items-center justify-between bg-blue-50 dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-blue-200 dark:border-slate-700 cursor-grab active:cursor-grabbing hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 group'>
      <span className='flex-1 text-slate-800 dark:text-slate-100 font-medium'>
        {contenido}
      </span>

      <button
        onClick={() => alBorrar(id)}
        className='ml-4 p-2 text-red-400 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-all cursor-pointer active:scale-90 opacity-0 group-hover:opacity-100'
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
