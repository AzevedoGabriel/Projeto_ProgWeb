import React from 'react';
import Login from './components/Login/Login';
import { Route, Routes } from 'react-router-dom';
import RegisterAluno from './components/RegistroAluno/Register';
import RegisterProfessor from './components/RegistroProfessor/Register'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
       {/* <Route path="/alunos" element={<Alunos />} /> */}
      <Route path="/register-aluno" element={<RegisterAluno />} />
      <Route path='/register-professor' element={<RegisterProfessor />} />
    </Routes>
  );
}

export default App;
