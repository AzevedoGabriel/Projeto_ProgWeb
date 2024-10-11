import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Treino {
  id: string;
  nome: string;
  descricao?: string;
  duracao: string;
}

const ListagemTreinos = () => {
  const [treinos, setTreinos] = useState<Treino[]>([]);
  const navigate = useNavigate();

  const fetchTreinos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/treinos");
      setTreinos(response.data);
    } catch (error) {
      console.error("Erro ao buscar treinos:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/delete-treino/${id}`);
      setTreinos(treinos.filter((treino) => treino.id !== id));
    } catch (error) {
      console.error("Erro ao deletar treino:", error);
    }
  };
  const handleCadastrarTreino = () => {
    navigate("/cadastra-treino");
  };

  useEffect(() => {
    fetchTreinos();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Lista de Treinos</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Duração</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {treinos.length > 0 ? (
            treinos.map((treino) => (
              <tr key={treino.id}>
                <td>{treino.nome}</td>
                <td>{treino.descricao || "N/A"}</td>
                <td>{treino.duracao}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(treino.id)}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>Nenhum treino cadastrado</td>
            </tr>
          )}
        </tbody>
      </table>

      <button className="btn btn-primary mt-3" onClick={handleCadastrarTreino}>
        Cadastrar Novo Treino
      </button>
    </div>
  );
};

export default ListagemTreinos;
