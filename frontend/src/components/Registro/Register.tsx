import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';


const RegisterAluno = () => {
  const [matricula, setMatricula] = useState('');
  const [name, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/register-aluno', {
        matricula,
        name,
        idade: Number(idade),
        senha,
      });
      const token = response.data.token;
      // Armazenar o token, se necessário
      console.log(token);
      navigate('/'); // Redirecionar para a tela de login
    } catch (err) {
      setError('Registro falhou. Verifique os dados inseridos.');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Cadastrar Aluno</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label className="form-label">Matrícula</label>
          <input
            type="text"
            className="form-control"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Idade</label>
          <input
            type="number"
            className="form-control"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input
            type="password"
            className="form-control"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Cadastrar</button>
      </form>
    </div>
  );
};

export default RegisterAluno;
