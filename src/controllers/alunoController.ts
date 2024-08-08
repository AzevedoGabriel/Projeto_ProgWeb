import { Request, Response } from "express";
import { AlunoService } from "../services/alunoService";

export class AlunoController {
  private alunoService: AlunoService;

  constructor() {
    this.alunoService = new AlunoService();
  }

  getAlunos = async (req: Request, res: Response) => {
    try {
      const alunos = await this.alunoService.getAllAlunos();
      res.json(alunos);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar alunos" });
    }
  };

  createAluno = async (req: Request, res: Response) => {
    const { matricula, name, idade } = req.body;
    if (!matricula || !name || !idade) {
      return res.status(400).json({ message: "Dados incompletos" });
    }

    try {
      const novoAluno = await this.alunoService.createAluno({
        matricula,
        name,
        idade,
      });
      res.status(201).json(novoAluno);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar aluno" });
    }
  };

  updateAluno = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { name, idade } = req.body;

    try {
      const updatedAluno = await this.alunoService.updateAluno(id, {
        name,
        idade,
      });
      if (!updatedAluno) {
        return res.status(404).json({ message: "Aluno não encontrado" });
      }
      res.json(updatedAluno);
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar aluno" });
    }
  };
}
