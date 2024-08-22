import { Request, Response } from "express";
import { ProfessorService } from "../services/professorService";

export class ProfessorController {
  private professorService: ProfessorService;

  constructor() {
    this.professorService = new ProfessorService();
  }

  getProfessores = async (req: Request, res: Response) => {
    try {
      const professores = await this.professorService.getAllProfessores();
      res.json(professores);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar professores" });
    }
  };

  getProfessorById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const professor = await this.professorService.getProfessorById(id);
      if (!professor) {
        return res.status(404).json({ message: "Professor não encontrado" });
      }
      res.json(professor);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar professor" });
    }
  };

  createProfessor = async (req: Request, res: Response) => {
    const { nome, idade } = req.body;
    if (!nome || idade === undefined) {
      return res.status(400).json({ message: "Dados incompletos" });
    }

    try {
      const novoProfessor = await this.professorService.createProfessor({
        nome,
        idade,
      });
      res.status(201).json(novoProfessor);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar professor" });
    }
  };

  updateProfessor = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { nome, idade } = req.body;

    try {
      const updatedProfessor = await this.professorService.updateProfessor(id, {
        nome,
        idade,
      });
      if (!updatedProfessor) {
        return res.status(404).json({ message: "Professor não encontrado" });
      }
      res.json(updatedProfessor);
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar professor" });
    }
  };

  deleteProfessor = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const deletedProfessor = await this.professorService.deleteProfessor(id);
      if (!deletedProfessor) {
        return res.status(404).json({ message: "Professor não encontrado" });
      }
      res.json({ message: "Professor deletado com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar professor" });
    }
  };
}
