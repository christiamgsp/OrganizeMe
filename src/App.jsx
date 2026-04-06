import { useState } from 'react';
import { tableroInicial } from './data/datosIniciales';
import { Columna } from './components/Columna';
import { useEffect } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { db } from './firebase/config';

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

  const editarTarea = (idTarea, nuevoTexto) => {
    setTablero((prev) => ({
      ...prev,
      tareas: {
        ...prev.tareas,
        [idTarea]: { ...prev.tareas[idTarea], contenido: nuevoTexto },
      },
    }));
  };

  const reordenarTarea = (idColumna, indiceOrigen, indiceDestino) => {
    setTablero((prev) => {
      const nuevaListaIds = [...prev.columnas[idColumna].tareasIds];
      const [idTareaMovida] = nuevaListaIds.splice(indiceOrigen, 1);
      nuevaListaIds.splice(indiceDestino, 0, idTareaMovida);
      return {
        ...prev,
        columnas: {
          ...prev.columnas,
          [idColumna]: {
            ...prev.columnas[idColumna],
            tareasIds: nuevaListaIds,
          },
        },
      };
    });
  };

  useEffect(() => {
    const tableroRef = ref(db, 'tablero');

    const desuscribir = onValue(tableroRef, (snapshot) => {
      const datos = snapshot.val();

      if (datos) {
        setTablero(datos);
      } else {
        console.log('Nube vacía. Subiendo tablero inicial...');
        set(tableroRef, tableroInicial);
      }
    });

    return () => desuscribir();
  }, []);

  return (
    <div className='min-h-screen bg-slate-50 dark:bg-slate-950 p-10 font-sans transition-colors duration-500'>
      <header className='mb-16 text-center'>
        <h1 className='text-slate-900 dark:text-slate-100 text-6xl font-extrabold tracking-tighter inline-block pb-3'>
          Organize<span className='text-blue-600 dark:text-blue-400'>Me</span>
        </h1>
        <p className='text-slate-600 dark:text-slate-400 mt-3 text-lg font-medium'>
          Gestiona tus proyectos con estilo
        </p>
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
