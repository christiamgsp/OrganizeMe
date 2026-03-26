import { useState } from 'react';
import { tableroInicial } from './data/datosIniciales';

function App() {
  return (
    <div className='h-screen bg-slate-900 flex items-center justify-center'>
      <h1 className='text-white text-3xl font-bold border-b-4 border-emerald-500 pb-2'>
        OrganizeMe
      </h1>
      <p>El tablero de mis sueños está en camino...</p>
    </div>
  );
}

export default App;
