import { Request, Response } from "express";
import { ProfessorService } from "../services/professorService";

export class ProfessorController {
  private professorService: ProfessorService;

  constructor() {
    this.professorService = new ProfessorService();
  }

  /**
   * @swagger
   * /professores:
   *   get:
   *     summary: Retrieve a list of all professors
   *     tags:
   *       - Professor
   *     responses:
   *       200:
   *         description: A list of professors
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: './schemas/schemas.json#/Professor'
   *       500:
   *         description: Internal server error
   */
  getProfessores = async (req: Request, res: Response) => {
    try {
      const professores = await this.professorService.getAllProfessores();
      res.json(professores);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar professores" });
    }
  };

  /**
   * @swagger
   * /professores/{id}:
   *   get:
   *     summary: Retrieve a professor by ID
   *     tags:
   *       - Professor
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID of the professor to retrieve
   *     responses:
   *       200:
   *         description: Professor found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: './schemas/schemas.json#/Professor'
   *       404:
   *         description: Professor not found
   *       500:
   *         description: Internal server error
   */
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

  /**
   * @swagger
   * /professores:
   *   post:
   *     summary: Create a new professor
   *     tags:
   *       - Professor
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: './schemas/schemas.json#/Professor'
   *     responses:
   *       201:
   *         description: Professor created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: './schemas/schemas.json#/Professor'
   *       400:
   *         description: Invalid input
   *       500:
   *         description: Internal server error
   */
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

  /**
   * @swagger
   * /professores/{id}:
   *   put:
   *     summary: Update an existing professor
   *     tags:
   *       - Professor
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID of the professor to update
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: './schemas/schemas.json#/Professor'
   *     responses:
   *       200:
   *         description: Professor updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: './schemas/schemas.json#/Professor'
   *       404:
   *         description: Professor not found
   *       500:
   *         description: Internal server error
   */
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

  /**
   * @swagger
   * /professores/{id}:
   *   delete:
   *     summary: Delete a professor
   *     tags:
   *       - Professor
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID of the professor to delete
   *     responses:
   *       200:
   *         description: Professor deleted successfully
   *       404:
   *         description: Professor not found
   *       500:
   *         description: Internal server error
   */
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
