import { Request, Response } from "express";
import { ExercicioService } from "../services/treinoService";

export class ExercicioController {
  private exercicioService: ExercicioService;

  constructor() {
    this.exercicioService = new ExercicioService();
  }

  getExercicios = async (req: Request, res: Response) => {
    try {
      const exercicios = await this.exercicioService.getAllExercicios();
      res.json(exercicios);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar exercícios" });
    }
  };

  getExercicioById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const exercicio = await this.exercicioService.getExercicioById(id);
      if (!exercicio) {
        return res.status(404).json({ message: "Exercício não encontrado" });
      }
      res.json(exercicio);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar exercício" });
    }
  };

  createExercicio = async (req: Request, res: Response) => {
    const { nome, duracao, descanso, treinoId } = req.body;
    if (!nome || duracao === undefined || descanso === undefined || !treinoId) {
      return res.status(400).json({ message: "Dados incompletos" });
    }

    try {
      const novoExercicio = await this.exercicioService.createExercicio({
        nome,
        duracao,
        descanso,
        treinoId,
      });
      res.status(201).json(novoExercicio);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar exercício" });
    }
  };

  updateExercicio = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { nome, duracao, descanso, treinoId } = req.body;

    try {
      const updatedExercicio = await this.exercicioService.updateExercicio(id, {
        nome,
        duracao,
        descanso,
        treinoId,
      });
      if (!updatedExercicio) {
        return res.status(404).json({ message: "Exercício não encontrado" });
      }
      res.json(updatedExercicio);
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar exercício" });
    }
  };

  deleteExercicio = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const deletedExercicio = await this.exercicioService.deleteExercicio(id);
      if (!deletedExercicio) {
        return res.status(404).json({ message: "Exercício não encontrado" });
      }
      res.json({ message: "Exercício deletado com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar exercício" });
    }
  };
}
