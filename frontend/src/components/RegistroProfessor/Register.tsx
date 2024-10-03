import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register: React.FC = () => {
  const [matricula, setMatricula] = useState("");
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState(0);
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/register-professor",
        {
          matricula,
          nome,
          idade,
          senha,
        }
      );
      if (response.status === 201) {
        alert("Professor cadastrado com sucesso!");
        navigate("/login");
      }
    } catch (err) {
      setError("Erro ao cadastrar professor, tente novamente.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card w-50">
        <div className="card-body">
          <h2 className="text-center mb-4">Cadastro de Professor</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="matricula">Matrícula</label>
              <input
                type="text"
                id="matricula"
                className="form-control"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                id="nome"
                className="form-control"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="idade">Idade</label>
              <input
                type="text"
                id="idade"
                className="form-control"
                value={idade}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setIdade(Number(value));
                  }
                }}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                id="senha"
                className="form-control"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
