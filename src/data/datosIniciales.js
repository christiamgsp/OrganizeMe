export const tableroInicial = {
  tareas: {
    'tarea-1': {
      id: 'tarea-1',
      contenido: 'Configurar el proyecto OrganizeMe',
    },
    'tarea-2': { id: 'tarea-2', contenido: 'Aprender la lógica de columnas' },
  },
  columnas: {
    'columna-1': {
      id: 'columna-1',
      titulo: 'Por hacer',
      tareasIds: ['tarea-1', 'tarea-2'], // Aquí guardamos el ORDEN de las tareas
    },
    'columna-2': {
      id: 'columna-2',
      titulo: 'En progreso',
      tareasIds: [],
    },
    'columna-3': {
      id: 'columna-3',
      titulo: 'Finalizado',
      tareasIds: [],
    },
  },
  ordenDeColumnas: ['columna-1', 'columna-2', 'columna-3'],
};
