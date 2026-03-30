import { useState } from 'react';
import { tableroInicial } from './data/datosIniciales';
import Tarea from './components/Tarea';

function App() {
  const [tablero, setTablero] = useState(tableroInicial);

  return (
    <div className='min-h-screen bg-slate-50 dark:bg-slate-950 p-10 font-sans transition-colors duration-500'>
      <header className='mb-12 text-center'>
        <h1 className='text-slate-800 dark:text-slate-100 text-5xl font-extrabold tracking-tight inline-block pb-2'>
          Organize<span className='text-blue-600 dark:text-blue-400'>Me</span>
        </h1>
        <p className='text-slate-600 dark:text-slate-400 mt-2 italic'>
          Gestiona tus proyectos con estilo
        </p>
      </header>

      <div className='flex gap-8 justify-center items-start'>
        {tablero.ordenDeColumnas.map((idCol) => {
          const columna = tablero.columnas[idCol];

          const borderColors = {
            'columna-1': 'border-blue-500 dark:border-blue-400',
            'columna-2': 'border-amber-500 dark:border-amber-400',
            'columna-3': 'border-emerald-500 dark:border-emerald-400',
          };

          return (
            <div
              key={idCol}
              className='bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 w-80 transition-all'>
              <div
                className={`border-b-4 ${borderColors[idCol] || 'border-slate-400'} mb-4`}>
                <h2 className='text-slate-700 dark:text-slate-300 font-bold pb-2 uppercase text-xs tracking-widest'>
                  {columna.titulo}
                </h2>
              </div>

              <ul className='space-y-4'>
                {/* 2. Aquí usamos el componente Tarea con un map limpio */}
                {columna.tareasIds.map((idTarea) => (
                  <Tarea
                    key={idTarea}
                    contenido={tablero.tareas[idTarea].contenido}
                  />
                ))}
              </ul>

              <button className='mt-6 w-full py-2 text-sm font-semibold text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg transition-colors border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-900'>
                + Añadir tarjeta
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
