import React from 'react';

const Tarea = ({ contenido }) => (
  <li className='bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer font-medium'>
    {contenido}
  </li>
);

export default Tarea;
