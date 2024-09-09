import { Request, Response } from "express";
import { ExercicioService } from "../services/exercicioService";

export class ExercicioController {
  private exercicioService: ExercicioService;

  constructor() {
    this.exercicioService = new ExercicioService();
  }

  /**
   * @swagger
   * /exercicios:
   *   get:
   *     summary: Retorna todos os exercícios
   *     tags: [Exercicio]
   *     responses:
   *       200:
   *         description: Lista de todos os exercícios
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Exercicio'
   *       500:
   *         description: Erro ao buscar exercícios
   */
  getExercicios = async (req: Request, res: Response) => {
    try {
      const exercicios = await this.exercicioService.getAllExercicios();
      res.json(exercicios);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar exercícios" });
    }
  };

  /**
   * @swagger
   * /exercicios/{id}:
   *   get:
   *     summary: Retorna um exercício pelo ID
   *     tags: [Exercicio]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID do exercício a ser buscado
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Exercício encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Exercicio'
   *       404:
   *         description: Exercício não encontrado
   *       500:
   *         description: Erro ao buscar exercício
   */
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

  /**
   * @swagger
   * /exercicios:
   *   post:
   *     summary: Cria um novo exercício
   *     tags: [Exercicio]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Exercicio'
   *     responses:
   *       201:
   *         description: Exercício criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Exercicio'
   *       400:
   *         description: Dados incompletos
   *       500:
   *         description: Erro ao criar exercício
   */
  createExercicio = async (req: Request, res: Response) => {
    const { nome, treinoId } = req.body;
    if (!nome  === undefined) {
      return res.status(400).json({ message: "Dados incompletos" });
    }

    try {
      const novoExercicio = await this.exercicioService.createExercicio({
        nome,
        treinoId,
      });
      res.status(201).json(novoExercicio);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar exercício" });
    }
  };

  /**
   * @swagger
   * /exercicios/{id}:
   *   put:
   *     summary: Atualiza um exercício pelo ID
   *     tags: [Exercicio]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID do exercício a ser atualizado
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Exercicio'
   *     responses:
   *       200:
   *         description: Exercício atualizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Exercicio'
   *       404:
   *         description: Exercício não encontrado
   *       500:
   *         description: Erro ao atualizar exercício
   */
  updateExercicio = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { nome } = req.body; // Remova treinoId aqui

    try {
      // Certifique-se de que a função de serviço `updateExercicio` está atualizada
      const updatedExercicio = await this.exercicioService.updateExercicio(id, {
        nome,
      });

      if (!updatedExercicio) {
        return res.status(404).json({ message: "Exercício não encontrado" });
      }

      res.json(updatedExercicio);
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar exercício" });
    }
  };

  /**
   * @swagger
   * /exercicios/{id}:
   *   delete:
   *     summary: Deleta um exercício pelo ID
   *     tags: [Exercicio]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID do exercício a ser deletado
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Exercício deletado com sucesso
   *       404:
   *         description: Exercício não encontrado
   *       500:
   *         description: Erro ao deletar exercício
   */
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
