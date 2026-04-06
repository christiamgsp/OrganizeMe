import React, { useState } from 'react';

export const Tarea = ({
  contenido,
  id,
  idColumna,
  indice,
  alBorrar,
  alEditar,
  alReordenar,
}) => {
  const [editando, setEditando] = useState(false);
  const [nuevoTexto, setNuevoTexto] = useState(contenido);

  const manejarInicioArrastre = (e) => {
    if (editando) return;
    e.dataTransfer.setData('idTarea', id);
    e.dataTransfer.setData('idOrigen', idColumna);
    e.dataTransfer.setData('indiceOrigen', indice);
    e.target.style.opacity = '0.5';
  };

  const manejarSoltar = (e) => {
    e.preventDefault();
    const idOrigen = e.dataTransfer.getData('idOrigen');
    const indiceOrigen = parseInt(e.dataTransfer.getData('indiceOrigen'));
    const indiceDestino = indice;

    if (idOrigen === idColumna && indiceOrigen !== indiceDestino) {
      alReordenar(idColumna, indiceOrigen, indiceDestino);
    }
  };

  const guardarCambio = () => {
    if (nuevoTexto.trim() !== '') {
      alEditar(id, nuevoTexto);
      setEditando(false);
    }
  };
  const manejarTecla = (e) => {
    if (e.key === 'Enter') {
      guardarCambio();
    }
    if (e.key === 'Escape') {
      setNuevoTexto(contenido);
      setEditando(false);
    }
  };

  return (
    <li
      draggable={!editando}
      onDragStart={manejarInicioArrastre}
      onDragEnd={(e) => (e.target.style.opacity = '1')}
      onDragOver={(e) => e.preventDefault()}
      onDrop={manejarSoltar}
      className={`flex items-center justify-between p-4 rounded-xl shadow-sm border transition-all duration-200 group ${
        editando
          ? 'bg-white border-blue-400 ring-2 ring-blue-100'
          : 'bg-blue-50 border-blue-200 hover:bg-blue-100 hover:border-blue-300 cursor-grab active:cursor-grabbing'
      }`}>
      {editando ? (
        <input
          autoFocus
          value={nuevoTexto}
          onChange={(e) => setNuevoTexto(e.target.value)}
          onKeyDown={manejarTecla}
          onBlur={guardarCambio}
          className='flex-1 bg-transparent outline-none text-slate-800 font-medium'
        />
      ) : (
        <span
          className='flex-1 text-slate-800 font-medium'
          onDoubleClick={() => setEditando(true)}>
          {contenido}
        </span>
      )}

      {!editando && (
        <button
          onClick={alBorrar}
          className='p-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity'>
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
      )}
    </li>
  );
};
