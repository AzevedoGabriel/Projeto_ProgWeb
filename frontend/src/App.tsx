import React from 'react';
import Login from './components/Login/Login';
import { Route, Routes } from 'react-router-dom';
import RegisterAluno from './components/RegistroAluno/Register';
import RegisterProfessor from './components/RegistroProfessor/Register'
import CadastrarExercicio from './components/Exercicio/CadastrarExercicio';
import ListarExercicios from './components/Exercicio/ListarExercicios';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* <Route path="/alunos" element={<Alunos />} /> */}
      <Route path="/register-aluno" element={<RegisterAluno />} />
      <Route path="/register-professor" element={<RegisterProfessor />} />
      <Route path="/cadastra-exercicio" element={<CadastrarExercicio />} />
      <Route path="/exercicios" element={<ListarExercicios />} />
    </Routes>
  );
}

export default App;
