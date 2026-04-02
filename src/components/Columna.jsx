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

  // Permitimos que el objeto "aterrice"
  const manejarArrastreSobre = (e) => {
    e.preventDefault();
  };

  // Ejecutamos el cambio de columna
  const manejarSoltar = (e) => {
    const idTarea = e.dataTransfer.getData('idTarea');
    const idOrigen = e.dataTransfer.getData('idOrigen');
    const idDestino = columna.id;

    if (idOrigen !== idDestino) {
      moverTarea(idTarea, idOrigen, idDestino);
    }
  };

  return (
    <div
      onDragOver={manejarArrastreSobre}
      onDrop={manejarSoltar}
      // bg-white: La columna ahora es blanca y limpia
      // border-slate-200: Un borde sutil para definir la columna
      // hover:border-blue-300: Efecto visual al pasar una tarea por encima
      className='bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 w-85 flex flex-col transition-all duration-300'>
      <h2 className='text-slate-900 dark:text-slate-100 font-extrabold pb-5 uppercase text-xs tracking-widest'>
        {columna.titulo}
      </h2>

      {/* min-h: asegura que siempre haya superficie para soltar tareas */}
      <ul className='space-y-4 min-h-[200px] mb-8'>
        {columna.tareasIds.map((idTarea) => (
          <Tarea
            key={idTarea}
            id={idTarea}
            idColumna={columna.id}
            contenido={tareas[idTarea].contenido}
            alBorrar={() => alBorrar(idTarea, columna.id)}
          />
        ))}
      </ul>

      <div className='mt-auto space-y-3'>
        <input
          type='text'
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder='Escribe tu nueva tarea...'
          className='w-full p-4 text-sm border border-slate-200 rounded-xl dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all'
        />
        <button
          onClick={manejarAñadir}
          className='w-full py-4 text-sm font-bold text-blue-700 bg-blue-100 hover:bg-blue-600 hover:text-white rounded-xl transition-all duration-200 border border-blue-200 hover:border-blue-600'>
          ➕ Añadir tarjeta
        </button>
      </div>
    </div>
  );
};
