import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Aluno {
  id: string;
  matricula: string;
  nome: string;
  idade: string;
}

const ListagemAluno = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const navigate = useNavigate();

  const fetchAlunos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/listagem-alunos");
      setAlunos(response.data);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/delete-alunos/${id}`);
      setAlunos(alunos.filter((aluno) => aluno.id !== id));
    } catch (error) {
      console.error("Erro ao deletar aluno:", error);
    }
  };

  const handleCadastrarAluno = () => {
    navigate("/alunos");
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Lista de Alunos</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Matrícula</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.length > 0 ? (
            alunos.map((aluno) => (
              <tr key={aluno.id}>
                <td>{aluno.matricula}</td>
                <td>{aluno.nome}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(aluno.id)}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>Nenhum aluno cadastrado</td>
            </tr>
          )}
        </tbody>
      </table>

      <button className="btn btn-primary mt-3" onClick={handleCadastrarAluno}>
        Cadastrar Novo Aluno
      </button>
    </div>
  );
};

export default ListagemAluno;
