import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [userType, setUserType] = useState("aluno");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint =
      userType === "professor" ? "/login-professor" : "/login-aluno";

    try {
      const response = await axios.post(endpoint, { matricula, senha });
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate(userType === "professor" ? "/professores" : "/alunos");
    } catch (error) {
      console.error("Login failed", error);
      alert("Login falhou, verifique suas credenciais");
    }
  };

  const handleRegister = () => {
    const registerPath =
      userType === "professor" ? "/register-professor" : "/register-aluno";
    navigate(registerPath);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow-lg"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label htmlFor="matricula">Matrícula</label>
            <input
              type="text"
              className="form-control"
              id="matricula"
              placeholder="Digite sua matrícula"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              className="form-control"
              id="senha"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="userType">Você é:</label>
            <select
              id="userType"
              className="form-select"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="aluno">Aluno</option>
              <option value="professor">Professor</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-2">
            Entrar
          </button>
        </form>

        <button
          type="button"
          className="btn btn-secondary w-100"
          onClick={handleRegister}
        >
          Cadastrar
        </button>
      </div>
    </div>
  );
};

export default Login;
