import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Exercicio {
  id: string;
  nome: string;
  duracao: number;
  descanso: number;
}

const ListarExercicios: React.FC = () => {
  const [exercicios, setExercicios] = useState<Exercicio[]>([]);

  useEffect(() => {
    const fetchExercicios = async () => {
      try {
        const response = await axios.get("/exercicios");
        setExercicios(response.data);
      } catch (error) {
        console.error("Erro ao buscar exercícios:", error);
      }
    };

    fetchExercicios();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Lista de Exercícios</h2>
      <Link to="/cadastrar-exercicio" className="btn btn-primary mb-3">
        Cadastrar Novo Exercício
      </Link>
      <ul className="list-group">
        {exercicios.map((exercicio) => (
          <li key={exercicio.id} className="list-group-item">
            <strong>{exercicio.nome}</strong> - Duração: {exercicio.duracao}{" "}
            min, Descanso: {exercicio.descanso} min
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListarExercicios;
