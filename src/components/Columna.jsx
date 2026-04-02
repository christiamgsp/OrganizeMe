import React, { useState } from 'react';
import { Tarea } from './Tarea';

export const Columna = ({
  columna,
  tareas,
  alAñadir,
  alBorrar,
  moverTarea,
}) => {
  const [texto, setTexto] = useState('');

  const manejarAñadir = () => {
    if (texto.trim() === '') return;
    alAñadir(columna.id, texto);
    setTexto('');
  };

  const orden = ['columna-1', 'columna-2', 'columna-3'];
  const miIndice = orden.indexOf(columna.id);
  const siguienteColumnaId = orden[miIndice + 1];

  return (
    <div className='bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 w-80 transition-all'>
      <h2 className='text-slate-700 dark:text-slate-300 font-bold pb-2 uppercase text-xs tracking-widest'>
        {columna.titulo}
      </h2>
      <ul className='space-y-4'>
        {columna.tareasIds.map((idTarea) => (
          <Tarea
            key={idTarea}
            contenido={tareas[idTarea].contenido}
            alBorrar={() => alBorrar(idTarea, columna.id)}
            moverTarea={
              siguienteColumnaId
                ? () => moverTarea(idTarea, columna.id, siguienteColumnaId)
                : null
            }
          />
        ))}
      </ul>
      <input
        type='text'
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder='Escribe tu nueva tarea...'
        className='w-full p-2 mb-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white'
      />
      <button
        onClick={manejarAñadir}
        className='mt-6 w-full py-2 text-sm font-semibold text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border-2 border-dashed border-slate-200 hover:border-blue-200'>
        ➕ Añadir tarjeta
      </button>
    </div>
  );
};
