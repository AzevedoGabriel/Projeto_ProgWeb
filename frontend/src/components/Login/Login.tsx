import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login-aluno', {
        matricula,
        senha,
      });
      localStorage.setItem('token', response.data.token);
      navigate('/alunos');
    } catch (err) {
      setError('Login falhou. Verifique sua matrícula e senha.');
      console.error(err);
    }
  };

  const handleRegister = () => {
    navigate('/register-aluno');
  };

  const handleAlunos = () => {
    navigate('/alunos')
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="matricula">Matrícula:</label>
          <input
            type="text"
            id="matricula"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button className='mb-2' type="submit" onClick={handleAlunos}>Login</button>
      </form>
      <button onClick={handleRegister}>Cadastrar</button>
    </div>
  );
};

export default Login;
