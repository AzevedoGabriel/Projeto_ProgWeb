import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CadastrarExercicio: React.FC = () => {
  const [nome, setNome] = useState<string>("");
  const [duracao, setDuracao] = useState<number>(0);
  const [descanso, setDescanso] = useState<number>(0);
  const navigate = useNavigate();

  const handleCadastrar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/cadastra-exercicio", { nome, duracao, descanso });
      navigate("/exercicios");
    } catch (error) {
      console.error("Erro ao cadastrar exercício:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Cadastrar Exercício</h2>
      <form onSubmit={handleCadastrar}>
        <div className="form-group">
          <label htmlFor="nome">Nome do Exercício</label>
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
          <label htmlFor="duracao">Duração (em minutos)</label>
          <input
            type="number"
            className="form-control"
            id="duracao"
            value={duracao}
            onChange={(e) => setDuracao(Number(e.target.value))}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="descanso">Descanso (em minutos)</label>
          <input
            type="number"
            className="form-control"
            id="descanso"
            value={descanso}
            onChange={(e) => setDescanso(Number(e.target.value))}
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

export default CadastrarExercicio;
