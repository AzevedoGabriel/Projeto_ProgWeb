import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CadastrarTreino: React.FC = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [duracao, setDuracao] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/cadastra-treino", {
        nome,
        descricao,
        duracao,
      });
      navigate("/treinos");
    } catch (error) {
      console.error("Erro ao cadastrar treino", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Cadastrar Treino</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome do Treino</label>
          <input
            type="text"
            className="form-control"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="descricao">Descrição</label>
          <input
            type="text"
            className="form-control"
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="duracao">Duração</label>
          <input
            type="text"
            className="form-control"
            id="duracao"
            value={duracao}
            onChange={(e) => setDuracao(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default CadastrarTreino;
