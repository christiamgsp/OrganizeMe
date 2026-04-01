import { useState } from 'react';
import { tableroInicial } from './data/datosIniciales';
import { Tarea } from './components/Tarea';
import { Columna } from './components/Columna';

function App() {
  const [tablero, setTablero] = useState(tableroInicial);

  const agregarTarea = (idColumna, textoUsuario) => {
    const nuevoId = `id-${Date.now()}`;

    setTablero((prev) => ({
      ...prev,
      tareas: {
        ...prev.tareas,
        [nuevoId]: { id: nuevoId, contenido: textoUsuario },
      },
      columnas: {
        ...prev.columnas,
        [idColumna]: {
          ...prev.columnas[idColumna],
          tareasIds: [...prev.columnas[idColumna].tareasIds, nuevoId],
        },
      },
    }));
  };
  const eliminarTarea = (idTarea, idColumna) => {
    setTablero((prev) => {
      const { [idTarea]: borrado, ...nuevasTareas } = prev.tareas;
      const nuevosIds = prev.columnas[idColumna].tareasIds.filter(
        (id) => id !== idTarea
      );
      return {
        ...prev,
        tareas: nuevasTareas,
        columnas: {
          ...prev.columnas,
          [idColumna]: { ...prev.columnas[idColumna], tareasIds: nuevosIds },
        },
      };
    });
  };
  const moverTarea = (idTarea, idOrigen, idDestino) => {
    setTablero((prev) => {
      const listaLimpia = prev.columnas[idOrigen].tareasIds.filter(
        (id) => id !== idTarea
      );

      const listaNueva = [...prev.columnas[idDestino].tareasIds, idTarea];

      return {
        ...prev,
        columnas: {
          ...prev.columnas,
          [idOrigen]: { ...prev.columnas[idOrigen], tareasIds: listaLimpia },
          [idDestino]: { ...prev.columnas[idDestino], tareasIds: listaNueva },
        },
      };
    });
  };

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
            <Columna
              key={idCol}
              columna={columna}
              tareas={tablero.tareas}
              colorClase={borderColors[idCol]}
              alAñadir={agregarTarea}
              alBorrar={eliminarTarea}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
