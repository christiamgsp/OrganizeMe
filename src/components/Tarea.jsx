import React from 'react';

export const Tarea = ({ contenido, id, alBorrar }) => (
  <li className='bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer font-medium'>
    {contenido}
    <button
      onClick={() => alBorrar(id)}
      className='text-red-400 hover:text-red-600 ml-auto'>
      ❌
    </button>
  </li>
);
