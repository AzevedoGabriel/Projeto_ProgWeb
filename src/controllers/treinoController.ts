import { Request, Response } from "express";
import { TreinoService } from "../services/treinoService";

export class TreinoController {
  private treinoService: TreinoService;

  constructor() {
    this.treinoService = new TreinoService();
  }

  getTreinos = async (req: Request, res: Response) => {
    try {
      const treinos = await this.treinoService.getAllTreinos();
      res.json(treinos);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar treinos" });
    }
  };

  getTreinoById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const treino = await this.treinoService.getTreinoById(id);
      if (!treino) {
        return res.status(404).json({ message: "Treino não encontrado" });
      }
      res.json(treino);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar treino" });
    }
  };

  createTreino = async (req: Request, res: Response) => {
    const { nome, descricao, data, duracao, exercicios } = req.body;
    if (!nome || !data || duracao === undefined) {
      return res.status(400).json({ message: "Dados incompletos" });
    }

    try {
      const novoTreino = await this.treinoService.createTreino({
        nome,
        descricao,
        data,
        duracao,
        exercicios,
      });
      res.status(201).json(novoTreino);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar treino" });
    }
  };

  updateTreino = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { nome, descricao, data, duracao, exercicios } = req.body;

    try {
      const updatedTreino = await this.treinoService.updateTreino(id, {
        nome,
        descricao,
        data,
        duracao,
        exercicios,
      });
      if (!updatedTreino) {
        return res.status(404).json({ message: "Treino não encontrado" });
      }
      res.json(updatedTreino);
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar treino" });
    }
  };

  deleteTreino = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const deletedTreino = await this.treinoService.deleteTreino(id);
      if (!deletedTreino) {
        return res.status(404).json({ message: "Treino não encontrado" });
      }
      res.json({ message: "Treino deletado com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar treino" });
    }
  };

  calculateTreinoDuration = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const totalDuration = await this.treinoService.calculateTotalDuration(id);
      res.json({ totalDuration });
    } catch (error) {
      res.status(500).json({ message: "Erro ao calcular duração do treino" });
    }
  };
}
