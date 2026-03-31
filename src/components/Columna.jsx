import React from 'react';
import { Tarea } from './Tarea';

export const Columna = ({ columna, tareas, colorClase }) => {
  return (
    <div className='bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 w-80 transition-all'>
      <h2 className='text-slate-700 dark:text-slate-300 font-bold pb-2 uppercase text-xs tracking-widest'>
        {columna.titulo}
      </h2>
      <ul className='space-y-4'>
        {columna.tareasIds.map((idTarea) => (
          <Tarea key={idTarea} contenido={tareas[idTarea].contenido} />
        ))}
      </ul>
    </div>
  );
};
