const [columnas, setColumnas] = useState([
  {
    id: 1,
    titulo: 'Pendiente',
    tareas: [{ id: 101, texto: 'Configurar Header' }],
  },
  {
    id: 2,
    titulo: 'En Progreso',
    tareas: [],
  },
]);

{
  columnas.map((col) => (
    <li key={col.id}>
      <h3>{col.titulo}</h3>
      {col.tareas.map((t) => (
        <li key={t.id}>{t.texto}</li>
      ))}
    </li>
  ));
}
