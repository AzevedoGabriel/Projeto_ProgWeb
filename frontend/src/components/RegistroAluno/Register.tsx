import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CadastraAluno = () => {
  const [matricula, setMatricula] = useState("");
  const [name, setName] = useState("");
  const [idade, setIdade] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/alunos", {
        matricula,
        name,
        idade,
        senha,
      });

      navigate("/listagem-aluno");
    } catch (error) {
      console.error("Erro ao cadastrar aluno", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Cadastrar Aluno</h2>
      <form onSubmit={handleSubmit}>
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
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Idade</label>
          <input
            type="text"
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
        <button type="submit" className="btn btn-primary">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default CadastraAluno;
