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
    alAñadir(columna.id, texto);
    setTexto('');
  };

  const manejarArrastreSobre = (e) => e.preventDefault();

  const manejarSoltar = (e) => {
    const idTarea = e.dataTransfer.getData('idTarea');
    const idOrigen = e.dataTransfer.getData('idOrigen');
    if (idOrigen !== columna.id) {
      moverTarea(idTarea, idOrigen, columna.id);
    }
  };

  return (
    <div
      onDragOver={manejarArrastreSobre}
      onDrop={manejarSoltar}
      className='bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 w-85 flex flex-col transition-all duration-300'>
      <h2 className='text-slate-900 dark:text-slate-100 font-extrabold pb-5 uppercase text-xs tracking-widest'>
        {columna.titulo}
      </h2>

      <ul className='space-y-4 min-h-[200px] mb-8'>
        {columna.tareasIds.map((idTarea, index) => (
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
        ))}
      </ul>

      <div className='mt-auto space-y-3'>
        <input
          type='text'
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder='Escribe tu nueva tarea...'
          className='w-full p-4 text-sm border border-slate-200 rounded-xl dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all'
        />
        <button
          onClick={manejarAñadir}
          className='w-full py-4 text-sm font-bold text-blue-700 bg-blue-100 hover:bg-blue-600 hover:text-white rounded-xl transition-all duration-200 border border-blue-200'>
          ➕ Añadir tarjeta
        </button>
      </div>
    </div>
  );
};
