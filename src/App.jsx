import { useState, useEffect } from 'react';
import { tableroInicial } from './data/datosIniciales';
import { Columna } from './components/Columna';
import { ref, onValue, set } from 'firebase/database';
import { db } from './firebase/config';
import { useTablero } from './hooks/useTablero';

function App() {
  const {
    tablero,
    agregarTarea,
    eliminarTarea,
    moverTarea,
    editarTarea,
    reordenarTarea,
  } = useTablero();
  if (!tablero) {
    return (
      <div className='min-h-screen bg-slate-950 flex items-center justify-center text-white font-bold'>
        Cargando tablero...
      </div>
    );
  }
  return (
    <div className='min-h-screen bg-slate-50 dark:bg-slate-950 p-10 transition-colors duration-500'>
      <header className='mb-16 text-center'>
        <h1 className='text-slate-900 dark:text-slate-100 text-6xl font-extrabold tracking-tighter'>
          Organize<span className='text-blue-600 dark:text-blue-400'>Me</span>
        </h1>
      </header>
      <div className='flex gap-10 justify-center items-start'>
        {tablero.ordenDeColumnas.map((idCol) => (
          <Columna
            key={idCol}
            columna={tablero.columnas[idCol]}
            tareas={tablero.tareas}
            alAñadir={agregarTarea}
            alBorrar={eliminarTarea}
            alEditar={editarTarea}
            moverTarea={moverTarea}
            reordenarTarea={reordenarTarea}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
// update config
