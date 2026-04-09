import React, { useState } from 'react';
import { Tarea } from './Tarea';

export const Columna = ({
  columna,
  tareas,
  alAñadir,
  alBorrar,
  alEditar,
  moverTarea,
  reordenarTarea,
}) => {
  const [texto, setTexto] = useState('');

  const manejarAñadir = () => {
    if (texto.trim() === '') return;
    alAñadir(columna.id, text);
    setTexto('');
  };

  const manejarSoltar = (e) => {
    const idTarea = e.dataTransfer.getData('idTarea');
    const idOrigen = e.dataTransfer.getData('idOrigen');
    if (idOrigen !== columna.id) moverTarea(idTarea, idOrigen, columna.id);
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={manejarSoltar}
      className='bg-white dark:bg-slate-900 p-5 md:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 w-full md:w-80 lg:w-96 flex flex-col shadow-sm'>
      <h2 className='text-slate-900 dark:text-slate-100 font-extrabold pb-5 uppercase text-xs tracking-widest'>
        {columna.titulo}
      </h2>

      <ul className='space-y-4 min-h-[150px] md:min-h-[200px] mb-8'>
        {(columna.tareasIds || []).map(
          (idTarea, index) =>
            tareas[idTarea] && (
              <Tarea
                key={idTarea}
                id={idTarea}
                indice={index}
                idColumna={columna.id}
                contenido={tareas[idTarea].contenido}
                alBorrar={() => alBorrar(idTarea, columna.id)}
                alEditar={alEditar}
                alReordenar={reordenarTarea}
              />
            )
        )}
      </ul>

      <div className='mt-auto space-y-3'>
        <input
          type='text'
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder='Nueva tarea...'
          className='w-full p-3 md:p-4 border border-slate-200 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 transition-all'
        />
        <button
          onClick={manejarAñadir}
          className='w-full py-3 md:py-4 font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors cursor-pointer'>
          ➕ Añadir tarjeta
        </button>
      </div>
    </div>
  );
};
