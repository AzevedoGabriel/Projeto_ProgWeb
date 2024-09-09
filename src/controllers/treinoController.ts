import { Request, Response } from "express";
import { TreinoService } from "../services/treinoService";

export class TreinoController {
  private treinoService: TreinoService;

  constructor() {
    this.treinoService = new TreinoService();
  }

  /**
   * @swagger
   * /treinos:
   *   get:
   *     summary: Retorna todos os treinos
   *     tags: [Treino]
   *     responses:
   *       200:
   *         description: Lista de todos os treinos
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Treino'
   *       500:
   *         description: Erro ao buscar treinos
   */
  getTreinos = async (req: Request, res: Response) => {
    try {
      const treinos = await this.treinoService.getAllTreinos();
      res.json(treinos);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar treinos" });
    }
  };

  /**
   * @swagger
   * /treinos/{id}:
   *   get:
   *     summary: Retorna um treino pelo ID
   *     tags: [Treino]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID do treino a ser buscado
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Treino encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Treino'
   *       404:
   *         description: Treino não encontrado
   *       500:
   *         description: Erro ao buscar treino
   */
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

  /**
   * @swagger
   * /treinos:
   *   post:
   *     summary: Cria um novo treino
   *     tags: [Treino]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Treino'
   *     responses:
   *       201:
   *         description: Treino criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Treino'
   *       400:
   *         description: Dados incompletos
   *       500:
   *         description: Erro ao criar treino
   */
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
        duracao
      });
      res.status(201).json(novoTreino);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar treino" });
    }
  };

  /**
   * @swagger
   * /treinos/{id}:
   *   put:
   *     summary: Atualiza um treino pelo ID
   *     tags: [Treino]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID do treino a ser atualizado
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Treino'
   *     responses:
   *       200:
   *         description: Treino atualizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Treino'
   *       404:
   *         description: Treino não encontrado
   *       500:
   *         description: Erro ao atualizar treino
   */
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

  /**
   * @swagger
   * /treinos/{id}:
   *   delete:
   *     summary: Deleta um treino pelo ID
   *     tags: [Treino]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID do treino a ser deletado
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Treino deletado com sucesso
   *       404:
   *         description: Treino não encontrado
   *       500:
   *         description: Erro ao deletar treino
   */
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
}
