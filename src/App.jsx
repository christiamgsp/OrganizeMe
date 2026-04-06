import { useState, useEffect } from 'react';
import { tableroInicial } from './data/datosIniciales';
import { Columna } from './components/Columna';
import { ref, onValue, set } from 'firebase/database';
import { db } from './firebase/config';

function App() {
  const [tablero, setTablero] = useState(null);

  // Esta función asegura que el tablero siempre tenga la estructura mínima
  const limpiarTablero = (datos) => ({
    ...datos,
    tareas: datos.tareas || {},
    columnas: datos.columnas || {},
    ordenDeColumnas: datos.ordenDeColumnas || [],
  });

  const guardarEnNube = (nuevoTablero) => {
    set(ref(db, 'tablero'), nuevoTablero);
  };

  useEffect(() => {
    const tableroRef = ref(db, 'tablero');
    const desuscribir = onValue(tableroRef, (snapshot) => {
      const datos = snapshot.val();
      if (datos && datos.columnas) {
        setTablero(limpiarTablero(datos));
      } else {
        console.log('Base de datos vacía. Inicializando...');
        guardarEnNube(tableroInicial);
      }
    });
    return () => desuscribir();
  }, []);

  const agregarTarea = (idColumna, textoUsuario) => {
    const nuevoId = `id-${Date.now()}`;
    const columnaActual = tablero.columnas[idColumna];
    const nuevoTablero = {
      ...tablero,
      tareas: {
        ...tablero.tareas,
        [nuevoId]: { id: nuevoId, contenido: textoUsuario },
      },
      columnas: {
        ...tablero.columnas,
        [idColumna]: {
          ...columnaActual,
          tareasIds: [...(columnaActual.tareasIds || []), nuevoId],
        },
      },
    };
    guardarEnNube(nuevoTablero);
  };

  const eliminarTarea = (idTarea, idColumna) => {
    const { [idTarea]: borrado, ...nuevasTareas } = tablero.tareas;
    const nuevosIds = (tablero.columnas[idColumna].tareasIds || []).filter(
      (id) => id !== idTarea
    );
    const nuevoTablero = {
      ...tablero,
      tareas: nuevasTareas,
      columnas: {
        ...tablero.columnas,
        [idColumna]: { ...tablero.columnas[idColumna], tareasIds: nuevosIds },
      },
    };
    guardarEnNube(nuevoTablero);
  };

  const moverTarea = (idTarea, idOrigen, idDestino) => {
    const listaLimpia = (tablero.columnas[idOrigen].tareasIds || []).filter(
      (id) => id !== idTarea
    );
    const listaNueva = [
      ...(tablero.columnas[idDestino].tareasIds || []),
      idTarea,
    ];
    const nuevoTablero = {
      ...tablero,
      columnas: {
        ...tablero.columnas,
        [idOrigen]: { ...tablero.columnas[idOrigen], tareasIds: listaLimpia },
        [idDestino]: { ...tablero.columnas[idDestino], tareasIds: listaNueva },
      },
    };
    guardarEnNube(nuevoTablero);
  };

  const editarTarea = (idTarea, nuevoTexto) => {
    const nuevoTablero = {
      ...tablero,
      tareas: {
        ...tablero.tareas,
        [idTarea]: { ...tablero.tareas[idTarea], contenido: nuevoTexto },
      },
    };
    guardarEnNube(nuevoTablero);
  };

  const reordenarTarea = (idColumna, indiceOrigen, indiceDestino) => {
    const nuevaListaIds = [...(tablero.columnas[idColumna].tareasIds || [])];
    const [idTareaMovida] = nuevaListaIds.splice(indiceOrigen, 1);
    nuevaListaIds.splice(indiceDestino, 0, idTareaMovida);
    const nuevoTablero = {
      ...tablero,
      columnas: {
        ...tablero.columnas,
        [idColumna]: {
          ...tablero.columnas[idColumna],
          tareasIds: nuevaListaIds,
        },
      },
    };
    guardarEnNube(nuevoTablero);
  };

  if (!tablero)
    return (
      <div className='min-h-screen bg-slate-950 flex items-center justify-center text-white font-bold'>
        Cargando tablero...
      </div>
    );

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
