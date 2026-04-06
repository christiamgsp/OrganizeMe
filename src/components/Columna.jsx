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

  const manejarSoltar = (e) => {
    const idTarea = e.dataTransfer.getData('idTarea');
    const idOrigen = e.dataTransfer.getData('idOrigen');
    if (idOrigen !== columna.id) moverTarea(idTarea, idOrigen, columna.id);
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={manejarSoltar}
      className='bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 w-85 flex flex-col'>
      <h2 className='text-slate-900 dark:text-slate-100 font-extrabold pb-5 uppercase text-xs tracking-widest'>
        {columna.titulo}
      </h2>

      <ul className='space-y-4 min-h-[200px] mb-8'>
        {/* USAMOS EL OPERADOR || [] PARA EVITAR EL ERROR DEL MAP */}
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
          className='w-full p-4 border rounded-xl dark:bg-slate-800 dark:text-white'
        />
        <button
          onClick={manejarAñadir}
          className='w-full py-4 font-bold text-blue-700 bg-blue-100 rounded-xl'>
          ➕ Añadir tarjeta
        </button>
      </div>
    </div>
  );
};
