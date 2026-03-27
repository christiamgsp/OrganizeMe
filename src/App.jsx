import { useState } from 'react';
import { tableroInicial } from './data/datosIniciales';

function App() {
  const [tablero, setTablero] = useState(tableroInicial);

  return (
    <div className='min-h-screen bg-slate-900 p-10'>
      <header className='mb-10 text-center'>
        <h1 className='text-white text-4xl font-bold border-b-4 border-emerald-500 inline-block pb-2'>
          OrganizeMe
        </h1>
      </header>

      <div className='flex gap-6 justify-center items-start'>
        {tablero.ordenDeColumnas.map((idCol) => (
          <div
            key={idCol}
            className='bg-slate-800 p-4 rounded-lg shadow-xl w-72 border border-slate-700'>
            <h2 className='text-emerald-400 font-bold mb-4 uppercase text-sm tracking-wider'>
              {tablero.columnas[idCol].titulo}
            </h2>

            <ul className='space-y-3'>
              {tablero.columnas[idCol].tareasIds.map((idTarea) => (
                <li
                  key={idTarea}
                  className='bg-slate-700 text-slate-200 p-3 rounded shadow-sm border-l-4 border-emerald-500 hover:bg-slate-600 transition-colors cursor-pointer'>
                  {tablero.tareas[idTarea].contenido}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

import React from 'react';
