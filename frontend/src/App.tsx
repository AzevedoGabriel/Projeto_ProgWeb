import React from 'react';
import Login from './components/Login/Login';
import { Route, Routes } from 'react-router-dom';
import RegisterAluno from './components/Registro/Register';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
       {/* <Route path="/alunos" element={<Alunos />} /> */}
      <Route path="/register-aluno" element={<RegisterAluno />} />
    </Routes>
  );
}

export default App;
