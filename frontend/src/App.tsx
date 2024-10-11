import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RegisterAluno from './components/RegistroAluno/Register';
import RegisterProfessor from './components/RegistroProfessor/Register'
import CadastrarTreino from './components/Treino/CadastraTreino';
import ListarTreinos from './components/Treino/ListarTreino';
import ListagemAluno from './components/RegistroAluno/ListarAluno';

function App() {
  return (
    <Routes>
      <Route path="/alunos" element={<RegisterAluno />} />
      <Route path="/listagem-aluno" element={<ListagemAluno />} />
      <Route path="/register-professor" element={<RegisterProfessor />} />
      <Route path="/cadastra-treino" element={<CadastrarTreino />} />
      <Route path="/treinos" element={<ListarTreinos />} />
    </Routes>
  );
}

export default App;
